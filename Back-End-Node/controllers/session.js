const { pool } = require("../config/dbConfig");

const sessions = async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT
          session.id,
          session.date,
          session.time_start,
          session.time_end,
          'Mentor' AS who_leading,
          'UK' AS city,
          session.meeting_link,
          lesson_content.module AS module_name,
          lesson_content.week_no AS module_week,
          lesson_content.syllabus_link
        FROM session
        JOIN lesson_content
        ON session.lesson_content_id = lesson_content.id;
      `);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching session data");
    console.error("Error executing query:", error);
  }
}



const createSession = async (req, res) => {
  const { date, time_start, time_end, meeting_link, lesson_content_id } = req.body;

  try {
    // Check if lesson_content_id exists in lesson_content table
    const lessonContentQuery = 'SELECT * FROM lesson_content WHERE id = $1';
    const lessonContentResult = await pool.query(lessonContentQuery, [lesson_content_id]);

    if (lessonContentResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid lesson_content_id' });
    }

    // Insert new session into session table
    const sessionQuery = `
      INSERT INTO session (date, time_start, time_end, meeting_link, lesson_content_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const sessionValues = [date, time_start, time_end, meeting_link, lesson_content_id];

    const sessionResult = await pool.query(sessionQuery, sessionValues);
    const sessionId = sessionResult.rows[0].id;

    // Join session with lesson_content to get the full details
    const joinedQuery = `
      SELECT 
        s.id AS session_id,
        s.date,
        s.time_start,
        s.time_end,
        s.meeting_link,
        lc.id AS lesson_content_id,
        lc.module,
        lc.module_no,
        lc.week_no,
        lc.lesson_topic,
        lc.syllabus_link
      FROM 
        session s
      JOIN 
        lesson_content lc
      ON 
        s.lesson_content_id = lc.id
      WHERE 
        s.id = $1;
    `;

    const joinedResult = await pool.query(joinedQuery, [sessionId]);

    res.status(201).json({
      message: 'Session added successfully',
      session: joinedResult.rows[0],
    });
  } catch (error) {
    console.error('Error adding session:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

const sessionAttendances = async (req, res) => {
  const sessionId = req.params.sessionId;
  try {
    const result = await pool.query(
      "SELECT person.slack_firstname, person.slack_lastname, role.name FROM attendance JOIN person ON attendance.person_id = person.id JOIN role ON attendance.role_id = role.id JOIN session ON attendance.session_id = session.id WHERE session.id = $1;",
      [sessionId]
    );

    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching attendance data");
    console.error("Error executing query:", error);
  }

}

module.exports = {
  sessions,
  sessionAttendances,
  createSession

}
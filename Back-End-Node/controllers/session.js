const { pool } = require("../config/dbConfig");

const sessions = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        session.id,
        session.date,
        session.time_start,
        session.time_end,
        session.meeting_link,
        region.name AS region,
        cohort.name AS cohort,
        module.name AS module,
        module_number.number AS module_number,
        week.number AS week,
        session.lead_teacher,
        session.syllabus_link
      FROM 
        public.session
      INNER JOIN 
        public.region ON session.region_id = region.id
      INNER JOIN 
        public.cohort ON session.cohort_id = cohort.id
      INNER JOIN 
        public.module ON session.module_id = module.id
      INNER JOIN 
        public.module_number ON session.module_number_id = module_number.id
      INNER JOIN 
        public.week ON session.week_id = week.id;
    `);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching session data");
    console.error("Error executing query:", error);
  }
};

const createSession = async (req, res) => {
  const { date, time_start, time_end, meeting_link, lead_teacher, region_id, cohort_id, module_id, module_number_id, week_id, syllabus_link } = req.body;

  try {
    const sessionQuery = `
      INSERT INTO public.session (date, time_start, time_end, meeting_link, lead_teacher, region_id, cohort_id, module_id, module_number_id, week_id, syllabus_link)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;
    const sessionValues = [date, time_start, time_end, meeting_link, lead_teacher, region_id, cohort_id, module_id, module_number_id, week_id, syllabus_link];

    const sessionResult = await pool.query(sessionQuery, sessionValues);
    res.status(201).json({
      message: 'Session added successfully',
      session: sessionResult.rows[0],
    });
  } catch (error) {
    console.error('Error adding session:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  sessions,
  createSession
};

const { pool } = require("../config/dbConfig");


const lessonContent = async (req, res) => {
    try {
      const result = await pool.query("Select * from lesson_content");
      res.send(result.rows);
    } catch (error) {
      res.status(500).send(error);
    }
}

const createLesson = async (req, res) => {
  const { module, module_no, week_no, lesson_topic, syllabus_link } = req.body;
  try{
    const query = `
    INSERT INTO lesson_content (module, module_no, week_no, lesson_topic, syllabus_link)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [module, module_no, week_no, lesson_topic, syllabus_link]
  const result = await pool.query(query, values)
  res.status(201).json({
    message: 'Lesson content added successfully',
    lesson_content: result.rows[0],
  });
  }catch (error) {
    console.error('Error adding lesson content:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

module.exports = {
    lessonContent,
    createLesson
}
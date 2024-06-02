const { pool } = require("../config/dbConfig");

const attendance = async (req, res) =>{
    const sessionId = req.params.sessionId;
  try {
    const result = await pool.query("SELECT person.slack_firstname, person.slack_lastname, role.name, session.lead_teacher FROM attendance JOIN person ON attendance.person_id = person.id JOIN role ON attendance.role_id = role.id JOIN session ON attendance.session_id = session.id WHERE session.id = $1;", [sessionId]);
    res.send(result.rows);
    console.log(result)
  } catch (error) {
    res.status(500).send("Error fetching attendance data");
    console.error("Error executing query:", error);
  }

}

module.exports = {
    attendance
}
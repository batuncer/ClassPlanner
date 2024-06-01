const { pool } = require("../config/dbConfig");

const moduleNumbers = async (req, res) =>{
  try {
    const result = await pool.query("SELECT * FROM module_number");
    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching module number data");
    console.error("Error executing query:", error);
  }
}

module.exports = {
    moduleNumbers
}
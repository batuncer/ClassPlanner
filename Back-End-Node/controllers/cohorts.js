const { executeQuery } = require("../config/dbConfig");

const cohorts = async (req, res) =>{
  try {
    const result = await executeQuery("SELECT * FROM cohort");
    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching city data");
    console.error("Error executing query:", error);
  }
}

module.exports = {
    cohorts
}
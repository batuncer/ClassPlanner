const { executeQuery } = require("../config/dbConfig");

const cities = async (req, res) =>{
  try {
    const result = await executeQuery("SELECT * FROM region");
    res.send(result.rows);
  } catch (error) {
    res.status(500).send("Error fetching city data");
    console.error("Error executing query:", error);
  }
}

module.exports = {
  cities
}
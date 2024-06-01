const { pool } = require("../config/dbConfig");

const modules = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM module");
    const modules = result.rows.map((module) => ({ id: module.id, name: module.name }));
    res.json(modules);
  } catch (error) {
    console.error("Error fetching names:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = {
  modules
}

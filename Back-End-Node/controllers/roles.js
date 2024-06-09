const { executeQuery } = require("../config/dbConfig");

const roles = async (req, res) => {
  try {
    const result = await executeQuery("SELECT * FROM role");
    const roles = result.rows.map((role) => ({ id: role.id, name: role.name }));
    res.json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = {
  roles
}

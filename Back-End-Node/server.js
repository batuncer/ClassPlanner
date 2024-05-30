const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const users = require("./routes/user.js")
const sessions = require("./routes/session.js")
const lessons = require("./routes/lesson.js")
const roles = require("./routes/roles.js")
const cities = require("./routes/cities.js")



app.use("/", users)
app.use("/", sessions)
app.use("/", lessons)
app.use("/", cities)
app.use("/", roles)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

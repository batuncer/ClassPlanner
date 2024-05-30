const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const fs = require("fs");
const path = require('path');
const https = require("https");
const http = require("http");
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

const options = {
  key: fs.readFileSync(`${__dirname}/certificates/client-key.pem`),
  cert: fs.readFileSync(`${__dirname}/certificates/client-cert.pem`),
};

if (process.env.LOCAL_DEVELOPMENT) {
  // Slack requires https for OAuth, but locally we want to use http
  // to avoid having to maintain our own certificates
  https.createServer(options, app).listen(443);
  http.createServer(app).listen(10000);
} else {
  // when we deploy on Vercel, Vercel adds HTTPS for us, so we can just use one port
  //console.log("PRODUCT");
  https.createServer(options, app).listen(10000);
}


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

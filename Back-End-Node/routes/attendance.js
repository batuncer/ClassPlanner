const express = require("express");
const verifyToken = require("../middleware/verifyToken")
const router = express.Router();
const {attendance} = require("../controllers/attendance")

router.get("/attendance/:sessionId",verifyToken, attendance)

module.exports = router;
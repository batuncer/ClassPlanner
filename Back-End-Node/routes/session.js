const express = require("express");
const verifyToken = require("../middleware/verifyToken")
const {sessions, sessionAttendances, createSession} = require("../controllers/session");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();

router.get("/sessions", verifyToken,sessions)
router.get("/attendance/:sessionId", verifyToken,sessionAttendances)
router.post("/create-session",verifyAdminToken, createSession)

module.exports = router;
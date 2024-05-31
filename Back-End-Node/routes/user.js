const express = require("express");
const verifyAdminToken = require("../middleware/verifyAdminToken")
const verifyToken = require("../middleware/verifyToken")
const { slackSingUp, userProfile, userActivity, registerSession, cancelRegister,} = require("../controllers/user")
const router = express.Router();

router.get("/auth/redirect", slackSingUp)
router.get("/profile",verifyToken, userProfile)
router.get("/activity",verifyToken, userActivity)
router.post("/insert-signup",verifyToken, registerSession)
router.get("/cancel-signup/:sessionId",verifyToken,cancelRegister)


module.exports = router;
const express = require ("express")
const verifyAdminToken = require("../middleware/verifyAdminToken")
const verifyToken = require("../middleware/verifyToken")
const { lessonContent, createLesson } = require("../controllers/lesson")
const router = express.Router();

router.get("/lessons", verifyAdminToken,lessonContent)
router.post("/create-lesson",verifyAdminToken,createLesson )

module.exports = router;
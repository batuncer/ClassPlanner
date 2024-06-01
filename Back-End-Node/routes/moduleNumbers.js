
const express = require("express");
const router = express.Router();
const { moduleNumbers } = require("../controllers/moduleNumbers");

router.get("/module-numbers",moduleNumbers)

module.exports = router;
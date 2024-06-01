const express = require("express");
const router = express.Router();
const { cohorts } = require("../controllers/cohorts");

router.get("/cohorts",cohorts)

module.exports = router;
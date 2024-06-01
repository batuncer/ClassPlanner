
const express = require("express");

const router = express.Router();
const { weeks } = require("../controllers/weeks");
router.get("/weeks",weeks)

module.exports = router;
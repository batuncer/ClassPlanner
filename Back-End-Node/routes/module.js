const express = require("express");
const router = express.Router();
const { modules } = require("../controllers/module");

router.get("/modules",modules)

module.exports = router;
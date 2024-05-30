const express = require("express");
const verifyToken = require("../middleware/verifyToken")
const router = express.Router();
const {cities} = require("../controllers/cities")

router.get("/cities", cities)

module.exports = router;
const express = require("express");
const verifyToken = require("../middleware/verifyToken")
const router = express.Router();
const {cities} = require("../controllers/cities")

router.get("/cities",verifyToken, cities)

module.exports = router;
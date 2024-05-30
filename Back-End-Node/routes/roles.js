const express = require("express");
const verifyToken = require("../middleware/verifyToken")
const router = express.Router();
const {roles} = require("../controllers/roles")

router.get("/roles", roles)


module.exports = router;
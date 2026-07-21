const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getBoard
} = require("../controllers/boardController");

router.get("/:projectId", protect, getBoard);

module.exports = router;
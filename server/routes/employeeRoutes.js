const express = require("express");

const router = express.Router();

const {

    getMyTasks,

    updateMyTask,

    getMyActivities,

    getMyCalendarTasks,

} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");

router.get(
    "/tasks",
    protect,
    getMyTasks
);

router.put(
    "/tasks/:id",
    protect,
    updateMyTask
);

router.get(
    "/activities",
    protect,
    getMyActivities
);

router.get(
    "/calendar",
    protect,
    getMyCalendarTasks
);

module.exports = router;
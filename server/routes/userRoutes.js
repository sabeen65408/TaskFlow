const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    getUsers,
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeDetails,
} = require("../controllers/userController");

router.get("/", protect, getUsers);

router.get(
    "/employees",
    protect,
    adminOnly,
    getEmployees
);

router.get(
    "/employees/:id",
    protect,
    getEmployeeDetails
);

router.post(
    "/employees",
    protect,
    adminOnly,
    createEmployee
);

router.put(
    "/employees/:id",
    protect,
    adminOnly,
    updateEmployee
);

router.delete(
    "/employees/:id",
    protect,
    adminOnly,
    deleteEmployee
);

module.exports = router;
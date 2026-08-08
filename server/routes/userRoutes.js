const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

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
    createEmployee
);

router.put(
    "/employees/:id",
    protect,
    updateEmployee
);

router.delete(
    "/employees/:id",
    protect,
    deleteEmployee
);

module.exports = router;
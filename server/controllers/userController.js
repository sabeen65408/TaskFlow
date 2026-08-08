const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Task = require("../models/Task");
const Project = require("../models/Project");
const Activity = require("../models/Activity");

/* =====================================
Get All Users
===================================== */

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password");

        res.json(users);
    }

    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


/* =====================================
Get Employees
===================================== */

const getEmployees = async (req, res) => {
    try {
        const employees = await User.find({
            role: "employee",
        }).select("-password");

        res.json(employees);
    }

    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


/* =====================================
Create Employee
===================================== */

const createEmployee = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            password,
        } = req.body;


        // =====================================
        // Validate required fields
        // =====================================

        if (
            !name ||
            !email ||
            !phone ||
            !password
        ) {

            return res.status(400).json({
                message: "Please fill all required fields",
            });

        }


        // =====================================
        // Normalize values
        // =====================================

        const normalizedEmail =
            email.trim().toLowerCase();

        const normalizedPhone =
            phone.trim();


        // =====================================
        // Check duplicate email
        // =====================================

        const emailExists =
            await User.findOne({
                email: normalizedEmail,
            });

        if (emailExists) {

            return res.status(400).json({
                message:
                    "An account with this email already exists",
            });

        }


        // =====================================
        // Check duplicate phone
        // =====================================

        const phoneExists =
            await User.findOne({
                phone: normalizedPhone,
            });

        if (phoneExists) {

            return res.status(400).json({
                message:
                    "An account with this phone number already exists",
            });

        }


        // =====================================
        // Hash password
        // =====================================

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // =====================================
        // Create employee
        // =====================================

        const employee =
            await User.create({

                name: name.trim(),

                email: normalizedEmail,

                phone: normalizedPhone,

                password: hashedPassword,

                role: "employee",

            });


        // =====================================
        // Remove password from response
        // =====================================

        const employeeResponse =
            employee.toObject();

        delete employeeResponse.password;


        res.status(201).json(
            employeeResponse
        );

    }

    catch (error) {

        // =====================================
        // MongoDB duplicate key protection
        // =====================================

        if (error.code === 11000) {

            const duplicateField =
                Object.keys(
                    error.keyPattern || {}
                )[0];

            if (
                duplicateField === "email"
            ) {

                return res.status(400).json({
                    message:
                        "An account with this email already exists",
                });

            }

            if (
                duplicateField === "phone"
            ) {

                return res.status(400).json({
                    message:
                        "An account with this phone number already exists",
                });

            }

            return res.status(400).json({
                message:
                    "An account with these details already exists",
            });

        }


        res.status(500).json({
            message: error.message,
        });
    }
};


/* =====================================
Update Employee
===================================== */

const updateEmployee = async (req, res) => {

    try {

        const employee =
            await User.findById(
                req.params.id
            );


        if (!employee) {

            return res.status(404).json({
                message: "Employee not found",
            });

        }


        const {
            name,
            email,
            phone,
        } = req.body;


        // =====================================
        // Normalize values
        // =====================================

        const normalizedEmail =
            email
                ? email.trim().toLowerCase()
                : employee.email;

        const normalizedPhone =
            phone !== undefined
                ? phone.trim()
                : employee.phone;


        // =====================================
        // Check duplicate email
        // =====================================

        if (
            normalizedEmail !==
            employee.email
        ) {

            const emailExists =
                await User.findOne({

                    email: normalizedEmail,

                    _id: {
                        $ne: employee._id,
                    },

                });


            if (emailExists) {

                return res.status(400).json({
                    message:
                        "An account with this email already exists",
                });

            }

        }


        // =====================================
        // Check duplicate phone
        // =====================================

        if (
            normalizedPhone !==
            employee.phone
        ) {

            const phoneExists =
                await User.findOne({

                    phone: normalizedPhone,

                    _id: {
                        $ne: employee._id,
                    },

                });


            if (phoneExists) {

                return res.status(400).json({
                    message:
                        "An account with this phone number already exists",
                });

            }

        }


        // =====================================
        // Update employee
        // =====================================

        employee.name =
            name
                ? name.trim()
                : employee.name;

        employee.email =
            normalizedEmail;

        employee.phone =
            normalizedPhone;


        await employee.save();


        // =====================================
        // Remove password
        // =====================================

        const employeeResponse =
            employee.toObject();

        delete employeeResponse.password;


        res.json(
            employeeResponse
        );

    }

    catch (error) {

        // =====================================
        // MongoDB duplicate key protection
        // =====================================

        if (error.code === 11000) {

            const duplicateField =
                Object.keys(
                    error.keyPattern || {}
                )[0];

            if (
                duplicateField === "email"
            ) {

                return res.status(400).json({
                    message:
                        "An account with this email already exists",
                });

            }

            if (
                duplicateField === "phone"
            ) {

                return res.status(400).json({
                    message:
                        "An account with this phone number already exists",
                });

            }

            return res.status(400).json({
                message:
                    "An account with these details already exists",
            });

        }


        res.status(500).json({
            message: error.message,
        });
    }
};


/* =====================================
Delete Employee
===================================== */

const deleteEmployee = async (req, res) => {

    try {

        const employee =
            await User.findById(
                req.params.id
            );


        if (!employee) {

            return res.status(404).json({
                message: "Employee not found",
            });

        }


        await employee.deleteOne();


        res.json({
            message: "Employee deleted",
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


/* =====================================
Get Employee Details
===================================== */

const getEmployeeDetails = async (req, res) => {

    try {

        const employee =
            await User.findById(
                req.params.id
            )
            .select("-password");


        if (!employee) {

            return res.status(404).json({
                message: "Employee not found",
            });
        }


        const totalTasks =
            await Task.countDocuments({

                assignedTo:
                    employee._id,

            });


        const completedTasks =
            await Task.countDocuments({

                assignedTo:
                    employee._id,

                column: "Done",

            });


        const pendingTasks =
            await Task.countDocuments({

                assignedTo:
                    employee._id,

                column: {
                    $ne: "Done",
                },

            });


        const totalProjects =
            await Project.countDocuments({

                members:
                    employee._id,

            });


        const tasks =
            await Task.find({

                assignedTo:
                    employee._id,

            })

            .populate(
                "project",
                "title"
            )

            .select(
                "title column priority project dueDate createdAt"
            )

            .sort({
                createdAt: -1,
            })

            .limit(5);


        const activities =
            await Activity.find({

                user:
                    employee._id,

            })

            .populate(
                "task",
                "title"
            )

            .sort({
                createdAt: -1,
            })

            .limit(8);


        res.json({

            employee,

            totalProjects,

            totalTasks,

            completedTasks,

            pendingTasks,

            tasks,

            activities,

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {

    getUsers,

    getEmployees,

    createEmployee,

    updateEmployee,

    deleteEmployee,

    getEmployeeDetails,

};
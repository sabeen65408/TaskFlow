const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const updateProfile = async (req, res) => {

    try {

        const {

            name,

            phone,

        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                message:"User not found"

            });

        }

        if (phone) {

            const existingUser = await User.findOne({

                phone,

                _id:{

                    $ne:user._id

                }

            });

            if (existingUser) {

                return res.status(400).json({

                    message:"Phone number already exists"

                });

            }

        }

        user.name = name || user.name;

        user.phone = phone;

        await user.save();

        res.json(user);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

const changePassword = async (req, res) => {

    try {

        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Current password is incorrect"
            });

        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(
            newPassword,
            salt
        );

        await user.save();

        res.json({
            message: "Password updated successfully"
        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
};
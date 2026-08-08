import { useState } from "react";
import toast from "react-hot-toast";
import {
    FiLock,
    FiX,
    FiSave
} from "react-icons/fi";

import { changePassword } from "../services/profileService";

function ChangePasswordModal({ onClose }) {

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {

            toast.error("Please fill all fields");

            return;

        }

        if (newPassword.length < 6) {

            toast.error(
                "Password must be at least 6 characters"
            );

            return;

        }

        if (newPassword !== confirmPassword) {

            toast.error(
                "Passwords do not match"
            );

            return;

        }

        try {

            await changePassword({

                currentPassword,
                newPassword,

            });

            toast.success(
                "Password changed successfully"
            );

            onClose();

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to change password"

            );

        }

    };

    return (

        <div className="modal-overlay">

            <div className="edit-profile-modal">

                <div className="edit-profile-header">

                    <h2>

                        Change Password

                    </h2>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                    >

                        <FiX />

                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="profile-group">

                        <label>

                            Current Password

                        </label>

                        <div className="profile-input-box">

                            <FiLock />

                            <input
                                type="password"
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                    </div>

                    <div className="profile-group">

                        <label>

                            New Password

                        </label>

                        <div className="profile-input-box">

                            <FiLock />

                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                    </div>

                    <div className="profile-group">

                        <label>

                            Confirm Password

                        </label>

                        <div className="profile-input-box">

                            <FiLock />

                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                    </div>

                    <div className="modal-actions">

                        <button
                            type="button"
                            className="modal-cancel-btn"
                            onClick={onClose}
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="modal-save-btn"
                        >

                            <FiSave />

                            Save Changes

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default ChangePasswordModal;
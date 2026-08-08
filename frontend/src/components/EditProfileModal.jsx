import { useState } from "react";
import {
    FiX,
    FiUser,
    FiPhone,
    FiSave,
} from "react-icons/fi";
function EditProfileModal({
    user,
    onClose,
    onSave,
}) {

    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone || "");

    const handleSubmit = async () => {

    if (!name.trim()) return;

    await onSave({
    name,
    phone,
});

    onClose();

};

    return (

        <div className="modal-overlay">

            <div
                className="modal-content"
                style={{
                    maxWidth: "500px",
                }}
            >

                {/* Close Button */}

                <button
                    className="popup-close-btn"
                    onClick={onClose}
                >
                    <FiX />
                </button>

                <h2
                    style={{
                        marginBottom: "25px",
                    }}
                >
                    Edit Profile
                </h2>

                {/* Name */}

                <div
                    style={{
                        marginBottom: "20px",
                    }}
                >

                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                        }}
                    >
                        Name
                    </label>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            border: "1px solid #d1d5db",
                            borderRadius: "10px",
                            padding: "12px",
                        }}
                    >

                        <FiUser />

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            style={{
                                flex: 1,
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                fontSize: "15px",
                            }}
                        />

                    </div>

                </div>

                <div
    style={{
        marginBottom:"20px",
    }}
>

    <label
        style={{
            display:"block",
            marginBottom:"8px",
            fontWeight:"600",
        }}
    >
        Phone Number
    </label>

    <div
        style={{
            display:"flex",
            alignItems:"center",
            gap:"10px",
            border:"1px solid #d1d5db",
            borderRadius:"10px",
            padding:"12px",
        }}
    >

        <FiPhone />

        <input
            type="text"
            value={phone}
            onChange={(e)=>
                setPhone(e.target.value)
            }
            style={{
                flex:1,
                border:"none",
                outline:"none",
                background:"transparent",
                fontSize:"15px",
            }}
        />

    </div>

</div>

                {/* Email */}

                <div
                    style={{
                        marginBottom: "30px",
                    }}
                >

                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "600",
                        }}
                    >
                        Email
                    </label>

                    <input
                        value={user.email}
                        disabled
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "1px solid #d1d5db",
                            background: "#f3f4f6",
                        }}
                    />

                </div>

                {/* Buttons */}

                <div className="modal-actions">

    <button
        className="modal-cancel-btn"
        onClick={onClose}
    >
        Cancel
    </button>

    <button
    className="modal-save-btn"
    onClick={handleSubmit}
>
    <FiSave />
    Save Changes
</button>

</div>

            </div>

        </div>

    );

}

export default EditProfileModal;
import { useEffect, useState } from "react";

import {
    getMembers,
    addMember,
    removeMember
} from "../services/teamService";

import {
    FiUserPlus,
    FiTrash2,
    FiUsers
} from "react-icons/fi";

function TeamMembers({ projectId }) {

    const [members, setMembers] = useState([]);
    const [email, setEmail] = useState("");

    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = async () => {
        try {
            const data = await getMembers(projectId);
            setMembers(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAdd = async () => {

        if (!email.trim()) return;

        try {

            await addMember(projectId, email);

            setEmail("");

            loadMembers();

        } catch (err) {

            alert(err.response?.data?.message);

        }
    };

    const handleDelete = async (id) => {

        const ok = window.confirm(
            "Remove this member?"
        );

        if (!ok) return;

        await removeMember(id);

        loadMembers();

    };

    return (

        <div
            style={{
                background: "#fff",
                marginTop: "25px",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0,0,0,.08)"
            }}
        >

            <h2
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}
            >
                <FiUsers />
                Team Members
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px"
                }}
            >

                <input
                    type="email"
                    placeholder="Enter member email..."
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    style={{
                        flex:1,
                        padding:"12px",
                        borderRadius:"8px",
                        border:"1px solid #ddd"
                    }}
                />

                <button
                    onClick={handleAdd}
                    style={{
                        background:"#2563eb",
                        color:"white",
                        border:"none",
                        padding:"12px 18px",
                        borderRadius:"8px",
                        cursor:"pointer",
                        display:"flex",
                        alignItems:"center",
                        gap:"8px"
                    }}
                >
                    <FiUserPlus/>
                    Add
                </button>

            </div>

            <div
                style={{
                    marginTop:"25px"
                }}
            >

                {
                    members.length===0 ?

                    <p>No members added.</p>

                    :

                    members.map(member=>(

                        <div
                            key={member._id}
                            style={{
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center",
                                padding:"15px",
                                background:"#f9fafb",
                                borderRadius:"10px",
                                marginBottom:"12px"
                            }}
                        >

                            <div>

                                <strong>

                                    {member.user?.name}

                                </strong>

                                <br/>

                                <small>

                                    {member.user?.email}

                                </small>

                            </div>

                            <div
                                style={{
                                    display:"flex",
                                    gap:"15px",
                                    alignItems:"center"
                                }}
                            >

                                <span
                                    style={{
                                        background:"#dbeafe",
                                        color:"#1d4ed8",
                                        padding:"4px 10px",
                                        borderRadius:"15px",
                                        fontSize:"13px"
                                    }}
                                >
                                    {member.role}
                                </span>

                                <FiTrash2
                                    size={20}
                                    color="red"
                                    style={{
                                        cursor:"pointer"
                                    }}
                                    onClick={()=>
                                        handleDelete(member._id)
                                    }
                                />

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default TeamMembers;
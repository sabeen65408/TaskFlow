import { useEffect, useState } from "react";

import {
  getMembers,
  addMember,
  removeMember,
} from "../services/teamService";

import {
  FiUserPlus,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";

import "../styles/teamMembers.css";

function TeamMembers({ projectId }) {

  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadMembers();
  }, [projectId]);

  const loadMembers = async () => {

    try {

      const data = await getMembers(projectId);

      setMembers(data);

    }

    catch (err) {

      console.log(err);

    }

  };

  const handleAdd = async () => {

    if (!email.trim()) return;

    try {

      await addMember(projectId, email);

      setEmail("");

      loadMembers();

    }

    catch (err) {

      alert(err.response?.data?.message);

    }

  };

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "Remove this member?"
    );

    if (!ok) return;

    try {

      await removeMember(id);

      loadMembers();

    }

    catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="team-card">

      <h2 className="team-title">

        <FiUsers />

        Team Members

      </h2>

      <div className="team-input-row">

        <input
          type="email"
          placeholder="Enter member email..."
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="team-input"
        />

        <button
          onClick={handleAdd}
          className="team-add-btn"
        >

          <FiUserPlus />

          Add

        </button>

      </div>

      <div className="team-list">

        {

          members.length === 0 ?

          <p className="team-empty">

            No members added.

          </p>

          :

          members.map((member) => (

            <div
              key={member._id}
              className="team-member"
            >

              <div className="team-member-info">

                <strong>

                  {member.user?.name}

                </strong>

                <small>

                  {member.user?.email}

                </small>

              </div>

              <div className="team-member-actions">

                <span className="team-role">

                  {member.role}

                </span>

                <FiTrash2
                  size={20}
                  className="team-delete"
                  onClick={() =>
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
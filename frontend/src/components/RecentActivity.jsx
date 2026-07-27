import { FiActivity } from "react-icons/fi";

function RecentActivity({ activities }) {

    return (

        <div className="dashboard-card">

            <h2 className="dashboard-heading">

                <FiActivity />

                Recent Activity

            </h2>

            <div
                className="dashboard-content"
                style={{
                    maxHeight: "420px",
                    overflowY: "auto"
                }}
            >

                {activities.length === 0 ? (

                    <p className="dashboard-empty">

                        No recent activity.

                    </p>

                ) : (

                    activities.map(activity => (

                        <div
                            key={activity._id}
                            className="dashboard-row"
                        >

                            <strong>

                                📁 {activity.project?.title || "Project"}

                            </strong>

                            <small>

                                ✅ Task :
                                {" "}
                                {activity.task?.title || "-"}

                            </small>

                            <small>

                                ✏️ Action :
                                {" "}
                                {activity.action}

                            </small>

                            <small>

                                👤 User :
                                {" "}
                                {activity.user?.name}

                            </small>

                            <small>

                                🕒
                                {" "}
                                {new Date(
                                    activity.createdAt
                                ).toLocaleString()}

                            </small>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default RecentActivity;
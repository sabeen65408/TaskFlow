import { useEffect, useState } from "react";
import { getProjectActivities } from "../services/activityService";
import "../styles/activityTimeline.css";

function ActivityTimeline({ projectId }) {

    const [activities, setActivities] = useState([]);

    useEffect(() => {

        loadActivities();

    }, [projectId]);

    const loadActivities = async () => {

        try {

            const data = await getProjectActivities(projectId);

            setActivities(data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="activity-card">

            <h3 className="activity-title">

                📜 Recent Activity

            </h3>

            {

                activities.length === 0 ?

                <p className="activity-empty">

                    No activity yet.

                </p>

                :

                <div className="activity-list">

                    {

                        activities.map((activity) => (

                            <div
                                key={activity._id}
                                className="activity-item"
                            >

                                <div className="activity-user">

                                    {activity.user?.name}

                                </div>

                                <div className="activity-action">

                                    {activity.action}

                                </div>

                                <div className="activity-time">

                                    {new Date(
                                        activity.createdAt
                                    ).toLocaleString()}

                                </div>

                            </div>

                        ))

                    }

                </div>

            }

        </div>

    );

}

export default ActivityTimeline;
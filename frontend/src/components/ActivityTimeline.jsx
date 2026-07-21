import { useEffect, useState } from "react";
import { getActivities } from "../services/activityService";

function ActivityTimeline({ projectId }) {

    const [activities, setActivities] = useState([]);

    useEffect(() => {

        load();

    }, []);

    const load = async () => {

        const data = await getActivities(projectId);

        setActivities(data);

    };

    return (

        <div
            style={{
                background:"#fff",
                padding:"20px",
                borderRadius:"12px",
                marginTop:"25px"
            }}
        >

            <h3>📜 Recent Activity</h3>

            {

                activities.length===0 ?

                <p>No activity yet.</p>

                :

                activities.map(a=>(

                    <div
                        key={a._id}
                        style={{
                            padding:"12px 0",
                            borderBottom:"1px solid #eee"
                        }}
                    >

                        <strong>

                            {a.user?.name}

                        </strong>

                        <br/>

                        {a.action}

                        <br/>

                        <small>

                            {new Date(
                                a.createdAt
                            ).toLocaleString()}

                        </small>

                    </div>

                ))

            }

        </div>

    );

}

export default ActivityTimeline;
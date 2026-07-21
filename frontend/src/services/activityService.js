import axios from "axios";

const API = "http://localhost:5000/api/activities";

const getToken = () => localStorage.getItem("token");

export const getActivities = async (projectId) => {

    const response = await axios.get(

        `${API}/${projectId}`,

        {
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        }

    );

    return response.data;

};
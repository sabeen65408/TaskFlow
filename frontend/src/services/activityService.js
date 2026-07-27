import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/activities`;

const getToken = () => localStorage.getItem("token");

export const getActivities = async () => {

    const response = await axios.get(

        API,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

    return response.data;

};

export const getProjectActivities = async (projectId) => {

    const response = await axios.get(

        `${API}/${projectId}`,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

    return response.data;

};
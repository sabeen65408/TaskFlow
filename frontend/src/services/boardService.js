import axios from "axios";

const API = "http://localhost:5000/api/boards";

const getBoard = async (projectId) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API}/${projectId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export { getBoard };
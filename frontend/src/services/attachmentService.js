import axios from "axios";

const API =
`${import.meta.env.VITE_API_URL}/attachments`;

const getToken = () => localStorage.getItem("token");

export const uploadAttachment = async (taskId, file) => {

    const formData = new FormData();

    formData.append("task", taskId);
    formData.append("file", file);

    const response = await axios.post(API, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};

export const getAttachments = async (taskId) => {

    const response = await axios.get(
        `${API}/${taskId}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const deleteAttachment = async (id) => {

    await axios.delete(

        `${API}/${id}`,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

};
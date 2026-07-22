import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/tasks`;

const getToken = () => localStorage.getItem("token");

export const getTasks = async (projectId) => {
    const response = await axios.get(
        `${API}/project/${projectId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return response.data;
};

export const getAllTasks = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

export const createTask = async (taskData) => {
    const response = await axios.post(API, taskData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return response.data;
};

export const updateTask = async (taskId, taskData) => {
    const response = await axios.put(
        `${API}/${taskId}`,
        taskData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const deleteTask = async (taskId) => {

    const response = await axios.delete(
        `${API}/${taskId}`,
        {
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const editTask = async (taskId, taskData) => {

    const response = await axios.put(
        `${API}/${taskId}`,
        taskData,
        {
            headers:{
                Authorization:`Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};
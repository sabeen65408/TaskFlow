import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/tasks`;

const getToken = () => localStorage.getItem("token");

/* =====================================
   Get Tasks by Project
===================================== */

export const getTasks = async (projectId) => {

    const response = await axios.get(

        `${API}/project/${projectId}`,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

    return response.data;

};

/* =====================================
   Get All Tasks
===================================== */

export const getAllTasks = async () => {

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

/* =====================================
   Get Single Task
===================================== */

export const getTaskById = async (taskId) => {

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

/* =====================================
   Create Task
===================================== */

export const createTask = async (taskData) => {

    const response = await axios.post(

        API,

        taskData,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

    return response.data;

};

/* =====================================
   Update Task
===================================== */

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

/* =====================================
   Edit Task
   (Alias of updateTask)
===================================== */

export const editTask = async (taskId, taskData) => {

    return updateTask(taskId, taskData);

};

/* =====================================
   Move Task
===================================== */

export const moveTask = async (taskId, column) => {

    const response = await axios.put(

        `${API}/${taskId}/move`,

        { column },

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

    return response.data;

};

/* =====================================
   Delete Task
===================================== */

export const deleteTask = async (taskId) => {

    const response = await axios.delete(

        `${API}/${taskId}`,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

    return response.data;

};
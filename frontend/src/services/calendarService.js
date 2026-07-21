import { getAllTasks } from "./taskService";

export const getCalendarTasks = async () => {
  return await getAllTasks();
};
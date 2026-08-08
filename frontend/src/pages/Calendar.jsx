import { useEffect, useState } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { getCalendarTasks } from "../services/calendarService";
import { getMyCalendarTasks } from "../services/employeeService";
import { getTaskById } from "../services/taskService";

import TaskDetailsDrawer from "../components/TaskDetailsDrawer";

import "../styles/calendar.css";

const localizer = momentLocalizer(moment);

function CalendarPage() {

    const [events, setEvents] = useState([]);

    const [view, setView] = useState("month");

    const [date, setDate] = useState(new Date());

    const [selectedTask, setSelectedTask] = useState(null);

    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {

        loadCalendar();

    }, []);

    const loadCalendar = async () => {

        try {

            const role = localStorage.getItem("role");

            const tasks =

                role === "employee"

                    ? await getMyCalendarTasks()

                    : await getCalendarTasks();

            const calendarEvents = tasks

                .filter(task => task.dueDate)

                .map(task => ({

                    id: task._id,

                    title: task.title,

                    start: new Date(task.dueDate),

                    end: new Date(task.dueDate),

                    allDay: true,

                }));

            setEvents(calendarEvents);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleSelectEvent = async (event) => {

        try {

            const task = await getTaskById(event.id);

            setSelectedTask(task);

            setDrawerOpen(true);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <>

            <div className="calendar-page">

                <h2 className="calendar-title">

                    📅 Task Calendar

                </h2>

                <Calendar

                    localizer={localizer}

                    events={events}

                    startAccessor="start"

                    endAccessor="end"

                    view={view}

                    onView={setView}

                    date={date}

                    onNavigate={setDate}

                    views={[
                        "month",
                        "week",
                        "day",
                        "agenda",
                    ]}

                    popup

                    selectable

                    onSelectEvent={handleSelectEvent}

                    style={{
                        height: 720,
                    }}

                />

            </div>

            <TaskDetailsDrawer

                show={drawerOpen}

                task={selectedTask}

                onClose={() => {

                    setDrawerOpen(false);

                    setSelectedTask(null);

                }}

            />

        </>

    );

}

export default CalendarPage;
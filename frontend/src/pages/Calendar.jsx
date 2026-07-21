import { useEffect, useState } from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { getCalendarTasks } from "../services/calendarService";

const localizer = momentLocalizer(moment);

function CalendarPage() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadCalendar();
  }, []);

  const loadCalendar = async () => {

    try {

      const tasks = await getCalendarTasks();

      const calendarEvents = tasks
        .filter(task => task.dueDate)
        .map(task => ({
          title: task.title,
          start: new Date(task.dueDate),
          end: new Date(task.dueDate),
          allDay: true,
        }));

      setEvents(calendarEvents);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "18px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)"
      }}
    >

      <h2
        style={{
          marginBottom: 20
        }}
      >
        📅 Task Calendar
      </h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 700
        }}
      />

    </div>

  );

}

export default CalendarPage;
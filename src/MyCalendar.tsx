import React, { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  DateLocalizer,
} from "react-big-calendar";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { startOfDay, endOfDay } from "date-fns";
import EventForm from "./components/EventForm";
import CustomToolbar from './components/CustomToolbar';


const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer: DateLocalizer = dateFnsLocalizer({
  format,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
}

const getRandomColor = () => {
  const colors = [
    "#F44336", // 빨강
    "#E91E63", // 분홍
    "#9C27B0", // 자주
    "#673AB7", // 진한 자주
    "#3F51B5", // 남색
    "#2196F3", // 파랑
    "#4CAF50", // 초록
    "#FFC107", // 황록
    "#FF5722", // 진한 주황
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const handleEventSelect = (event: Event) => {
    if (window.confirm("정말로 이 이벤트를 삭제하시겠습니까?")) {
      setEvents(events.filter((e) => e !== event));
    }
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEvent: Event = {
      title: formData.get("title") as string,
      start: startOfDay(new Date(formData.get("start") as string)),
      end: endOfDay(new Date(formData.get("end") as string)),
      allDay: true,
      color: getRandomColor(), // 새 이벤트에 대해서만 무작위 색상 적용
    };
    setEvents([...events, newEvent]);
  };

  const eventStyleGetter = (event: Event) => {
    const backgroundColor = event.color || "#2196F3";
    const style = {
      backgroundColor,
    };
    return { style };
  };

  return (
    <div>
      <div style={{ height: "500px", marginBottom: "1rem" }}>
        <Calendar
          localizer={localizer}
          events={events}
          views={["month", "agenda"]}
          defaultView="month"
          components={{
            toolbar: CustomToolbar,
          }}
          onSelectEvent={handleEventSelect}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
        />
      </div>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <EventForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default MyCalendar;

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
import { serverData } from "./state/serverData";
import ko from "date-fns/locale/ko";
import { EventModal } from "./components/EventModal";



const localizer = dateFnsLocalizer({
  format,
  startOfWeek,
  getDay,
  locales: {
    'ko': ko,  
    'en-US': require('date-fns/locale/en-US'),
  }
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
    "#F44336", 
    "#E91E63", 
    "#9C27B0", 
    "#673AB7", 
    "#3F51B5", 
    "#2196F3", 
    "#4CAF50", 
    "#FFC107", 
    "#FF5722", 
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

// 서버 데이터를 Event 형식에 맞게 변환
const convertServerDataToEvents = (serverData: any[]) => {
  const events: Event[] = serverData.map((data) => {
    let start: Date;
    let end: Date;

    // Handle different date formats
    if (data.date.includes("~")) {
      const [startStr, endStr] = data.date.split("~").map((s: string) => s.trim());
      start = new Date(new Date().getFullYear(), parseInt(data.month) - 1, parseInt(startStr.split(".")[0]));
      end = new Date(new Date().getFullYear(), parseInt(data.month) - 1, parseInt(endStr.split(".")[0]));
    } else if (data.date.includes("-")) {
      const [startStr, endStr] = data.date.split("-").map((s: string) => s.trim());
      start = new Date(new Date().getFullYear(), parseInt(startStr.split(".")[0]) - 1, parseInt(startStr.split(".")[1]));
      end = new Date(new Date().getFullYear(), parseInt(endStr.split(".")[0]) - 1, parseInt(endStr.split(".")[1]));
    } else {
      start = new Date(new Date().getFullYear(), parseInt(data.month) - 1, parseInt(data.date.split(".")[0]));
      end = start;
    }

    return {
      title: data.event,
      start: startOfDay(start),
      end: endOfDay(end),
      allDay: true,
      color: getRandomColor(),
    };
  });

  return events;
};


// 사용 예시
const initialEvents = convertServerDataToEvents(serverData);

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  const handleEventSelect = (event: Event, e: any) => {
    // 여기에서는 클릭한 이벤트와 같은 날짜에 있는 이벤트를 찾습니다.
    const sameDayEvents = events.filter((evt) => {
      return evt.start.toDateString() === event.start.toDateString();
    });
    setSelectedEvents(sameDayEvents);
    setShowModal(true);
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
          culture='ko'
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
      {showModal && (
        <EventModal
          events={selectedEvents}
          onClose={() => setShowModal(false)}
        />
      )}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <EventForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default MyCalendar;

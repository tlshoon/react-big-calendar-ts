import React from "react";

interface EventFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        제목:
        <input type="text" name="title" required />
      </label>
      <label style={{ marginLeft: "15px" }}>
        시작:
        <input type="date" name="start" required />
      </label>
      <label style={{ margin: "0px 10px 0px 15px" }}>
        종료:
        <input type="date" name="end" required />
      </label>
      <button type="submit">할 일 추가</button>
    </form>
  );
};

export default EventForm;

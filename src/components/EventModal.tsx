import React from 'react';

export const EventModal = ({ events, onClose }) => (
  <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '1rem', zIndex:'10', width: '250px' }}>
    <h3>이벤트 목록</h3>
    <ul>
      {events.map((event, index) => (
        <li key={index}>{event.title}</li>
      ))}
    </ul>
    <button onClick={onClose}>닫기</button>
  </div>
);

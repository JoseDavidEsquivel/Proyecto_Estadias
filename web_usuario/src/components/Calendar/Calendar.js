// Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'

const CalendarWithEvents = ({ events, onDateClick }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
    onDateClick(date.toISOString()); // Convertir la fecha a formato ISOString para consistencia
  };

  const convertToUTC = (dateString) => {
    const date = new Date(dateString);
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  };

  const eventDates = Array.isArray(events) ? events.map(event => convertToUTC(event.fecha)) : [];

  const markDates = ({ date, view }) => {
    if (view === 'month') {
      const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
      if (eventDates.find(d => d.toDateString() === utcDate.toDateString())) {
        return 'highlight';
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatMonthYear = (locale, date) => {
    const month = capitalizeFirstLetter(date.toLocaleString(locale, { month: 'long' }));
    const year = date.getFullYear();
    return `${month} - ${year}`;
  };

  return (
    <Calendar
      onChange={handleDateChange}
      value={date}
      tileClassName={markDates}
      formatMonthYear={formatMonthYear}
    />
  );
};

export default CalendarWithEvents;
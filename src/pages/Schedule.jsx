import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt, FaTrashAlt } from 'react-icons/fa';
import DashboardLayout from '../layouts/DashboardLayout';
import { FaGoogle, FaMicrosoft, FaVideo } from 'react-icons/fa';
import '../styles/Schedule.css';

function Schedule() {
    const [events, setEvents] = useState([
        { id: 1, title: 'Call with Marie', date: '2025-05-02', time: '14:00' },
        { id: 2, title: 'Deliver design to John', date: '2025-05-03', time: '10:30' },
    ]);

    const [toast, setToast] = useState('');
    const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '' });
    const [calendarDate, setCalendarDate] = useState(null);

    const handleAdd = () => {
        if (!newEvent.title || !newEvent.date || !newEvent.time) {
            setToast("Please fill event details first.");
            setTimeout(() => setToast(''), 3000);
            return;
        }
        const event = {
            id: Date.now(),
            ...newEvent,
        };
        setEvents([...events, event]);
        setNewEvent({ title: '', date: '', time: '' });
    };


    const deleteEvent = (id) => {
        setEvents(events.filter(e => e.id !== id));
    };

    const filteredEvents = calendarDate
        ? events.filter(event => event.date === calendarDate.toISOString().split('T')[0])
        : events;



    const openGoogleCalendar = (event) => {
        if (!event.title || !event.date || !event.time) {
            setToast("Please fill event details first.");
            setTimeout(() => setToast(''), 3000);
            return;
        }
        const date = event.date.replace(/-/g, '');
        const time = event.time.replace(':', '') + '00';
        const start = `${date}T${time}`;
        const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(event.title)}&dates=${start}/${start}&details=Planned%20via%20Freelancer%20Pilot`;
        window.open(url, '_blank');
    };

    const openOutlook = (event) => {
        if (!event.title || !event.date || !event.time) {
            setToast("Please fill event details first.");
            setTimeout(() => setToast(''), 3000);
            return;
        }

        const dateTime = `${event.date}T${event.time}`;
        const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${dateTime}&enddt=${dateTime}&body=Planned%20via%20Freelancer%20Pilot`;
        window.open(url, '_blank');
    };

    const openZoom = (event) => {
        if (!event.title || !event.date || !event.time) {
            setToast("Please fill event details first.");
            setTimeout(() => setToast(''), 3000);
            return;
        }
        const url = `https://zoom.us/meeting/schedule`;
        window.open(url, '_blank');
    };



    return (
        <DashboardLayout>
            <div className="schedule-container">
                <div className="header-schedule">
                    <div className='icon-calender'><FaCalendarAlt /></div>
                    <h2>Your Schedule</h2>
                </div>

                <div className="schedule-grid">
                    {/* Calendar */}
                    <div className="calendar-box">
                        <Calendar
                            value={calendarDate}
                            onChange={setCalendarDate}
                            tileContent={({ date, view }) => {
                                if (view === 'month') {
                                    const match = events.some(e => e.date === date.toISOString().split('T')[0]);
                                    return match ? <div className="dot" /> : null;
                                }
                            }}
                        />
                        <button className="btn-clear" onClick={() => setCalendarDate(null)}>Show All</button>
                    </div>

                    {/* Add New Event */}
                    <div className="event-form">
                        <h3>Add New Event</h3>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={newEvent.title}
                            onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                        />
                        <input
                            type="date"
                            value={newEvent.date}
                            onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                        />
                        <input
                            type="time"
                            value={newEvent.time}
                            onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                        />
                        <button className="btn-purple" onClick={handleAdd}>Add Event</button>
                        <div className="external-links">
                            <p>Plan also on :</p>
                            <button className="ext-btn google" onClick={() => openGoogleCalendar(newEvent)}>
                                <FaGoogle /> Google Calendar
                            </button>
                            <button className="ext-btn outlook" onClick={() => openOutlook(newEvent)}>
                                <FaMicrosoft /> Outlook
                            </button>
                            <button className="ext-btn zoom" onClick={() => openZoom(newEvent)}>
                                <FaVideo /> Zoom
                            </button>
                        </div>



                    </div>

                    {/* Upcoming Events */}
                    <div className="event-list">
                        <h3>
                            {calendarDate ? `Events on ${calendarDate.toISOString().split('T')[0]}` : 'All Events'}
                        </h3>
                        {filteredEvents.length === 0 ? (
                            <p>No events scheduled.</p>
                        ) : (
                            filteredEvents.map(event => (
                                <div key={event.id} className="event-card">
                                    <div>
                                        <strong>{event.title}</strong><br />
                                        {event.date} — {event.time}
                                    </div>
                                    <FaTrashAlt onClick={() => deleteEvent(event.id)} className="delete-icon" />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {toast && <div className="toast">{toast}</div>}

        </DashboardLayout>
    );
}

export default Schedule;

import React, { useState } from 'react';
import '../Patients.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Profile = () => {
  class Patient {
    constructor(name, age, weight, height, allergies) {
      this.name = name;
      this.age = age;
      this.weight = weight;
      this.height = height;
      this.allergies = allergies;
    }
  }

  const patient = new Patient("Emmy Fong", "100", "100", "100", "leaves");
  const patients = [
    new Patient("Emmy Fong", "100", "100", "100", "leaves"),
    new Patient("Emmy Song", "100", "100", "100", "leaves"),
    new Patient("Emmy Wong", "100", "100", "100", "leaves"),
    new Patient("Emmy Long", "100", "100", "100", "leaves")
  ];

  const isDoctor = true;

  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointmentTitle, setAppointmentTitle] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);

  const onChange = (date) => {
    setDate(date);
  };

  const handleDayClick = (value) => {
    setSelectedDate(value);
    const dayAppointments = appointments.filter(
      (appt) => appt.date.toDateString() === value.toDateString()
    );
    setSelectedEvents(dayAppointments);
    setShowAppointmentForm(true); // Show the form when a day is clicked
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && appointmentTitle) {
      const newAppointment = {
        date: selectedDate,
        title: appointmentTitle,
      };
      setAppointments([...appointments, newAppointment]);
      setAppointmentTitle('');
      setShowAppointmentForm(false); // Hide the form after submission
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayAppointments = appointments.filter(
        (appt) => appt.date.toDateString() === date.toDateString()
      );
      return (
        <div>
          {dayAppointments.map((appt, index) => (
            <div key={index} className="appointment-badge">
              {appt.title}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const DoctorPage = () => (
    <div className="doctor-page">
      <h1>Doctor Dashboard</h1>
      <h2>Patients</h2>
      <div className="patient-container">
        {patients.map((patient, index) => (
          <div key={index} className="patient-card">
            <h3>{patient.name}</h3>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Height:</strong> {patient.height} cm</p>
            <p><strong>Weight:</strong> {patient.weight} kg</p>
            <p><strong>Allergies:</strong> {patient.allergies}</p>
            <button className="view-details-button">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );

  const PatientPage = () => (
    <div className="patient-page">
      <h1>Welcome, {patient.name}</h1>
      <div className="patient-info">
        <h2>Your Statistics</h2>
        <div className="stats-container">
          <div className="stat-card">
            <strong>Age</strong>
            <p>{patient.age} years</p>
          </div>
          <div className="stat-card">
            <strong>Height</strong>
            <p>{patient.height} cm</p>
          </div>
          <div className="stat-card">
            <strong>Weight</strong>
            <p>{patient.weight} kg</p>
          </div>
          <div className="stat-card">
            <strong>Allergies</strong>
            <p>{patient.allergies}</p>
          </div>
        </div>
      </div>
      <div className="calendar-section">
        <h2>Appointment Calendar</h2>
        <div className="calendar-container">
          <Calendar
            onChange={onChange}
            value={date}
            className="custom-calendar"
            onClickDay={handleDayClick}
            tileContent={tileContent}
          />
          {showAppointmentForm && (
            <div className="appointment-form">
              <h3>Create Appointment on {selectedDate.toDateString()}</h3>
              <form onSubmit={handleAppointmentSubmit}>
                <input
                  type="text"
                  placeholder="Appointment Title"
                  value={appointmentTitle}
                  onChange={(e) => setAppointmentTitle(e.target.value)}
                  required
                  autoFocus // Ensure the input field is focused
                />
                <button type="submit">Add Appointment</button>
                <button type="button" onClick={() => setShowAppointmentForm(false)}>
                  Cancel
                </button>
              </form>
            </div>
          )}
          {selectedEvents.length > 0 && (
            <div className="event-popout">
              <h3>Events on {selectedDate.toDateString()}</h3>
              <ul>
                {selectedEvents.map((event, index) => (
                  <li key={index}>{event.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      {isDoctor ? <DoctorPage /> : <PatientPage />}
    </div>
  );
};

export default Profile;
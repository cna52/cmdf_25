import React, { useState, useEffect } from 'react';
import '../Patients.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Profile = () => {
  class Patient {
    constructor(name, age, weight, height, allergies = []) {
      this.name = name;
      this.age = age;
      this.weight = weight;
      this.height = height;
      this.allergies = allergies;
    }
  }

  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null);
  const [newAllergy, setNewAllergy] = useState("");
  const [isEditingAllergies, setIsEditingAllergies] = useState(false);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      // Create a new patient object using the user's name
      const newPatient = new Patient(storedUser.name, "100", "100", "100", ["leaves"]);
      setPatient(newPatient);
    }
  }, []);

  const patients = [
    new Patient("Emmy Long", "100", "100", "100", ["peanuts"])
  ];

  const isDoctor = false;

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

  const handleAddAllergy = () => {
    if (newAllergy.trim() !== "") {
      const updatedAllergies = [...patient.allergies, newAllergy.trim()];
      setPatient({ ...patient, allergies: updatedAllergies });
      setNewAllergy("");
    }
  };

  const handleRemoveAllergy = (index) => {
    const updatedAllergies = patient.allergies.filter((_, i) => i !== index);
    setPatient({ ...patient, allergies: updatedAllergies });
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
            <p><strong>Allergies:</strong> {patient.allergies.join(", ")}</p>
            <button className="view-details-button">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );

const PatientPage = () => {
  const [editMode, setEditMode] = useState({
    age: false,
    height: false,
    weight: false,
    allergies: false,
  });

  const [editedValues, setEditedValues] = useState({
    age: patient ? patient.age : "",
    height: patient ? patient.height : "",
    weight: patient ? patient.weight : "",
  });

  const [newAllergy, setNewAllergy] = useState("");

  const handleEditToggle = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field, value) => {
    setEditedValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (field) => {
    setPatient((prev) => ({ ...prev, [field]: editedValues[field] }));
    setEditMode((prev) => ({ ...prev, [field]: false }));
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim() !== "") {
      const updatedAllergies = [...patient.allergies, newAllergy.trim()];
      setPatient((prev) => ({ ...prev, allergies: updatedAllergies }));
      setNewAllergy("");
    }
  };

  const handleRemoveAllergy = (index) => {
    const updatedAllergies = patient.allergies.filter((_, i) => i !== index);
    setPatient((prev) => ({ ...prev, allergies: updatedAllergies }));
  };

  return (
    <div className="patient-page">
      <h1>Welcome, {patient ? patient.name : "Guest"}</h1>
      <div className="patient-info">
        <h2>Your Statistics</h2>
        <div className="stats-container">
          <div className="stat-card">
            <strong>Age</strong>
            <p>{patient ? patient.age : "N/A"} years</p>
          </div>
          <div className="stat-card">
            <strong>Height</strong>
            <p>{patient ? patient.height : "N/A"} cm</p>
          </div>
          <div className="stat-card">
            <strong>Weight</strong>
            <p>{patient ? patient.weight : "N/A"} kg</p>
          </div>
          <div className="stat-card">
            <strong>Allergies</strong>
            <p>{patient ? patient.allergies.join(", ") : "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Floating Editorial Blocks */}
      <div className="editorial-blocks-container">
        <div className="editorial-block">
          <h3>Edit Age</h3>
          {editMode.age ? (
            <div>
              <input
                type="text"
                value={editedValues.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                placeholder="Enter your age"
              />
              <button onClick={() => handleSave("age")}>Save</button>
              <button className="cancel-button" onClick={() => handleEditToggle("age")}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => handleEditToggle("age")}>Edit Age</button>
          )}
        </div>

        <div className="editorial-block">
          <h3>Edit Height</h3>
          {editMode.height ? (
            <div>
              <input
                type="text"
                value={editedValues.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                placeholder="Enter your height"
              />
              <button onClick={() => handleSave("height")}>Save</button>
              <button className="cancel-button" onClick={() => handleEditToggle("height")}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => handleEditToggle("height")}>Edit Height</button>
          )}
        </div>

        <div className="editorial-block">
          <h3>Edit Weight</h3>
          {editMode.weight ? (
            <div>
              <input
                type="text"
                value={editedValues.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                placeholder="Enter your weight"
              />
              <button onClick={() => handleSave("weight")}>Save</button>
              <button className="cancel-button" onClick={() => handleEditToggle("weight")}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => handleEditToggle("weight")}>Edit Weight</button>
          )}
        </div>

        <div className="editorial-block">
          <h3>Edit Allergies</h3>
          <div className="allergies-list">
            {patient && patient.allergies.map((allergy, index) => (
              <div key={index} className="allergy-item">
                <span>{allergy}</span>
                <button
                  onClick={() => handleRemoveAllergy(index)}
                  className="remove-allergy-button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="add-allergy-form">
            <input
              type="text"
              placeholder="Add an allergy"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              className="allergy-input"
            />
            <button onClick={handleAddAllergy} className="add-allergy-button">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
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
                  autoFocus
                />
                <button type="submit">Add Appointment</button>
                <button type="button" onClick={() => setShowAppointmentForm(false)}>
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="profile-container">
      {isDoctor ? <DoctorPage /> : <PatientPage />}
    </div>
  );
};

export default Profile;
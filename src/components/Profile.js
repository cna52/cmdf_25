import React, {useState} from 'react';
import '../Patients.css'
import Calendar from 'react-calendar'


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
    const isDoctor = false;

    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date);
    };

    const DoctorPage = () => (
        <div>
            <h1>Doctor</h1>
            <h2>Patients</h2>
        
        <div className="patient-container">
      {patients.map((patient, index) => (
        <div key={index} className="patient-card">
            <h3>{patient.name}</h3>
            <p><strong>Age: </strong>{patient.age}</p>
            <p><strong>Height: </strong>{patient.height}</p>
            <p><strong>Weight: </strong>{patient.weight}</p>
            <p><strong>Allergies:</strong> {patient.allergies}</p>
        </div>

      ))}
    </div>
    </div>
    );

    const PatientPage = () => (
        <div>
            <h1>{patient.name}</h1>
            <h2><strong>Info</strong></h2>
            <p><strong>Age: </strong>{patient.age}</p>
            <p><strong>Height: </strong>{patient.height}</p>
            <p><strong>Weight: </strong>{patient.weight}</p>
            <p><strong>Allergies:</strong> {patient.allergies}</p>
            <Calendar onChange={onChange} value={date} />
        </div>
            
    );

    return (
        <div>
            {isDoctor ? <DoctorPage /> : <PatientPage />}
        </div>
    );
};

export default Profile;
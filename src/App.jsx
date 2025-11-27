import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


export default function App() {
  const educations = [];
  const professionnals = [];

  const [fullName, setFullName] = useState('Théophile Jachiet');
  const [email, setEmail] = useState('tjachiet@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+33 6 07 88 78 98');
  const [adress, setAdress] = useState('33 rue de la paix 75001, Paris');

  const [school, setSchool] = useState('BTS Audiovisuel');
  const [degree, setDegree] = useState('Options métiers de l\'image');
  const [schoolStartDate, setSchoolStartDate] = useState(2018);
  const [schoolEndDate, setSchoolEndDate] = useState(2020);
  const [schoolLocation, setSchoolLocation] = useState('Roubaix');

  const btsRoubaix = {
    id: crypto.randomUUID(),
    school: school,
    degree: degree,
    schoolStartDate: schoolStartDate,
    schoolEndDate: schoolEndDate,
    schoolLocation: schoolLocation
  }

  educations.push(btsRoubaix);

  function handleChange(setter) {
    return (e) => setter(e.target.value);
  }

  function handleEducationCHange(setter) {
    return (e) => {
      setter(e.target.value);
    }
  }

  return (
    <>
      <div className="app-container">
        <div className="edit-panel">
          <div className="personal-info">
            <CustomInput id="fullName" description="Full Name" value={fullName} onChange={handleChange(setFullName)} />
            <CustomInput id="email" description="E-mail" value={email} onChange={handleChange(setEmail)} />
            <CustomInput id="phone" description="Phone Number" value={phoneNumber} onChange={handleChange(setPhoneNumber)} />
            <CustomInput id="adress" description="Adress" value={adress} onChange={handleChange(setAdress)} />
          </div>

          <div className="education">
            <CustomInput id="school" description="School" value={school} onChange={handleEducationCHange(setSchool, school)} />
            <CustomInput id="degree" description="Degree" value={degree} onChange={handleEducationCHange(setDegree)} />
            <CustomInput id="start-date" description="Start Date" value={schoolStartDate} onChange={handleEducationCHange(setSchoolStartDate)} />
            <CustomInput id="end-date" description="End Date" value={schoolEndDate} onChange={handleEducationCHange(setSchoolEndDate)} />
            <CustomInput id="location" description="Location" value={schoolLocation} onChange={handleEducationCHange(setSchoolLocation)} />
          </div>
        </div>

        <div className="cv-container">
          <div className="cv-header">
            <h1>{fullName}</h1>

            <div className="info-container">
              <p>{email}</p>
              <p>{phoneNumber}</p>
              <p>{adress}</p>
            </div>
          </div>

          <div className="cv-section">
            <EducationList list={educations} />
          </div>
        </div>
      </div>
    </>
  )
}

function CustomInput({ id, description, value, onChange }) {
  return (
    <label htmlFor={id}>{description}
      <input type="text" id={id} value={value} onChange={onChange} />
    </label>
  )
}

function EducationList({ list }) {
  if (list.length === 0) return;

  console.log(list);

  const educationItems = list.map(education =>
    <li key={education.id}>
      <div className="entry-time-and-place">
        <p>{education.schoolStartDate} - {education.schoolEndDate}</p>
        <p>{education.schoolLocation}</p>
      </div>

      <div className="entry-info">
        <p>{education.school}</p>
        <p>{education.degree}</p>
      </div>
    </li>
  )

  return (
    <article>
      <h2>Education</h2>
      <ul>{educationItems}</ul>
    </article>
  )
}
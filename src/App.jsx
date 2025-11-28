import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//TODO : Put all the education logic in a separate function and just display a + Button that triggers the education form to display itself 
//and create a new education object and append it to the educations array.
//Question : then how can i access the states of education in the App ? Is it even necessary ?
const educations = [];
const professionnals = [];

export default function App() {
  const [displayAddEducation, setDisplayAddEducation] = useState(false);

  const [person, setPerson] = useState({
    fullName:'Théophile Jachiet',
    email: 'tjachiet@gmail.com',
    phoneNumber: '+33 6 85 74 84 92',
    adress: '33 rue de la paix, 75001, Paris'
  })

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.id]: e.target.value
    })
  }

  function handleAddEducation() {
    setDisplayAddEducation(true);
  }

  return (
    <>
      <div className="app-container">
        <div className="edit-panel">
          <div className="personal-info">
            <CustomInput id="fullName" description="Full Name" value={person.fullName} onChange={handleChange} />
            <CustomInput id="email" description="E-mail" value={person.email} onChange={handleChange} />
            <CustomInput id="phone" description="Phone Number" value={person.phoneNumber} onChange={handleChange} />
            <CustomInput id="adress" description="Adress" value={person.adress} onChange={handleChange} />
          </div>

          <div className="education-panel">
            <button className="add-education" onClick={handleAddEducation}>+</button>
            {displayAddEducation && <EducationFactory/>}
          </div>

        </div>

        <div className="cv-container">
          <div className="cv-header">
            <h1>{person.fullName}</h1>

            <div className="info-container">
              <p>{person.email}</p>
              <p>{person.phoneNumber}</p>
              <p>{person.adress}</p>
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

function EducationEditList({list}) {
  const displayList = list.map(item =>
    <li key={item.id}>
      {item.school}
    </li>
  )
  return <ul>{displayList}</ul>
}

function EducationFactory() {

  const [school, setSchool] = useState('BTS Audiovisuel');
  const [degree, setDegree] = useState('Options métiers de l\'image');
  const [schoolStartDate, setSchoolStartDate] = useState(2018);
  const [schoolEndDate, setSchoolEndDate] = useState(2020);
  const [schoolLocation, setSchoolLocation] = useState('Roubaix');

  function handleEducationCHange(setter) {
    return (e) => {
      setter(e.target.value);
    }
  }

  const btsRoubaix = {
    id: crypto.randomUUID(),
    school: school,
    degree: degree,
    schoolStartDate: schoolStartDate,
    schoolEndDate: schoolEndDate,
    schoolLocation: schoolLocation
  }

  educations.push(btsRoubaix);

  return (
    <div className="education-form">
      <CustomInput id="school" description="School" value={school} onChange={handleEducationCHange(setSchool, school)} />
      <CustomInput id="degree" description="Degree" value={degree} onChange={handleEducationCHange(setDegree)} />
      <CustomInput id="start-date" description="Start Date" value={schoolStartDate} onChange={handleEducationCHange(setSchoolStartDate)} />
      <CustomInput id="end-date" description="End Date" value={schoolEndDate} onChange={handleEducationCHange(setSchoolEndDate)} />
      <CustomInput id="location" description="Location" value={schoolLocation} onChange={handleEducationCHange(setSchoolLocation)} />
    </div>
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
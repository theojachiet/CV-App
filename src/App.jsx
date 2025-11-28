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

  const [person, setPerson] = useState({
    fullName: 'Théophile Jachiet',
    email: 'tjachiet@gmail.com',
    phoneNumber: '+33 6 85 74 84 92',
    adress: '33 rue de la paix, 75001, Paris'
  });

  const [educationList, setEducationList] = useState([]);

  const [educationItem, setEducationItem] = useState({
    school: '',
    degree: '',
    startDate: '',
    endDate: '',
    location: ''
  });

  function handlePersonalChange(e) {
    setPerson({
      ...person,
      [e.target.id]: e.target.value
    })
  }

  function handleEducationCHange(e) {
    setEducationItem({
      ...educationItem,
      [e.target.id]: e.target.value
    })
  }

  function handleAddEducation() {
    setEducationList([
      ...educationList,
      setEducationItem({

      })
    ])
  }

  return (
    <>
      <div className="app-container">
        <div className="edit-panel">
          <div className="personal-info">
            <CustomInput id="fullName" description="Full Name" value={person.fullName} onChange={handlePersonalChange} />
            <CustomInput id="email" description="E-mail" value={person.email} onChange={handlePersonalChange} />
            <CustomInput id="phone" description="Phone Number" value={person.phoneNumber} onChange={handlePersonalChange} />
            <CustomInput id="adress" description="Adress" value={person.adress} onChange={handlePersonalChange} />
          </div>

          <div className="education-panel">
            <div className="education-form">
              <CustomInput id="school" description="School" value={educationItem.school} onChange={handleEducationCHange} />
              <CustomInput id="degree" description="Degree" value={educationItem.degree} onChange={handleEducationCHange} />
              <CustomInput id="startDate" description="Start Date" value={educationItem.startDate} onChange={handleEducationCHange} />
              <CustomInput id="endDate" description="End Date" value={educationItem.endDate} onChange={handleEducationCHange} />
              <CustomInput id="location" description="Location" value={educationItem.location} onChange={handleEducationCHange} />
            </div>
            <button className="add-education" onClick={handleAddEducation}>+</button>
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
            <EducationList list={educationList} />
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
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//display an input and having it auto refresh an html template beside it

export default function App() {
  const [fullName, setFullName] = useState('Théophile Jachiet');
  const [email, setEmail] = useState('tjachiet@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+33 6 07 88 78 98');
  const [adress, setAdress] = useState('33 rue de la paix 75001, Paris');

  function handleChange(setter) {
    return (e) => setter(e.target.value);
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
            <EducationList />
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

function EducationList() {
  const educationItems = edcuations.map(education => {
    <li key={education.id}>
      <div className="entry-time-and-place">
        <p>{education.dates}</p>
        <p>{education.place}</p>
      </div>

      <div className="entry-info">
        <p>{education.school}</p>
        <p>{education.field}</p>
      </div>
    </li>
  })
  
  return (
    <article>
      <h2>Education</h2>
      <ul>{educationItems}</ul>
    </article>
  )
}
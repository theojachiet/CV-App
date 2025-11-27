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
          <CustomInput id="fullName" description="Full Name" value={fullName} onChange={handleChange(setFullName)} />
          <CustomInput id="email" description="E-mail" value={email} onChange={handleChange(setEmail)} />
          <CustomInput id="phone" description="Phone Number" value={phoneNumber} onChange={handleChange(setPhoneNumber)} />
          <CustomInput id="adress" description="Adress" value={adress} onChange={handleChange(setAdress)} />
        </div>
        <div className="cv-container">
          <div className="cv-Header">
            <h1>{fullName}</h1>
            <div className="info-container">
              <p>{email}</p>
              <p>{phoneNumber}</p>
              <p>{adress}</p>
          </div>
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
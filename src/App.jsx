import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//display an input and having it auto refresh an html template beside it

export default function App() {
  const [fullName, setFullName] = useState('Théophile Jachiet');

  function handleChange(e) {
    setFullName(e.target.value);
  }

  return (
    <>
      <div className="app-container">
        <div className="edit-panel">
          <CustomInput value={fullName} onChange={handleChange} />
        </div>
        <div className="cv-container">
          <h1>{fullName}</h1>
        </div>
      </div>
    </>
  )
}
function CustomInput({ value, onChange }) {
  return (
    <input type="text" value={value} onChange={onChange} />
  )
}
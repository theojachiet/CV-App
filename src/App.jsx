import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//display an input and having it auto refresh an html template beside it

export default function App() {
  const [firstName, setFirstName] = useState('');

  function handleChange(e) {
    setFirstName(e.target.value);
  }

  return (
    <>
      <CustomInput value={firstName} onChange={handleChange}/>
      <h1>{firstName}</h1>
    </>
  )
}
function CustomInput({ value, onChange }) {
  return ( <input type="text" value={value} onChange={onChange}/> )
}
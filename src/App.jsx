import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//display an input and having it auto refresh an html template beside it

export default function App() {
  const [firstName, setFirstName] = useState('');
  return (
    <>
      <input type="text" />
    </>
  )
}
function customInput({ value, onChange }) {
  return <input type="text" value={value} onChange={handleChange}/>
}
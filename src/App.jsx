import { startTransition, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {

  const [person, setPerson] = useState({
    fullName: 'Théophile Jachiet',
    email: 'tjachiet@gmail.com',
    phoneNumber: '+33 6 85 74 84 92',
    adress: '33 rue de la paix, 75001, Paris'
  });

  const [educationList, setEducationList] = useState([{
    id: crypto.randomUUID(),
    school: 'BTS Audiovisuel',
    degree: 'métiers de l\'image',
    startDate: 2018,
    endDate: 2020,
    location: 'Roubaix'
  }, {
    id: crypto.randomUUID(),
    school: 'MANCAV',
    degree: 'Audiovisuel',
    startDate: 2017,
    endDate: 2018,
    location: 'Sarlat-la-Canéda'
  }]);


  function handlePersonalChange(e) {
    setPerson({
      ...person,
      [e.target.id]: e.target.value
    })
  }

  function handleEducationChange(index, key, value) {
    setEducationList(list => [
      //Before and after the item and update the object here
      ...list.slice(0, index),
      { ...list[index], [key]: value },
      ...list.slice(index + 1)
    ])
  }

  function handleAddEducation(newEducation) {
    setEducationList([
      ...educationList,
      newEducation
    ])
  }


  return (
    <>
      <div className="app-container">
        <div className="edit-panel">
          <div className="personal-info">
            <CustomInput id="fullName" description="Full Name" value={person.fullName} onChange={handlePersonalChange} />
            <CustomInput id="email" description="E-mail" value={person.email} onChange={handlePersonalChange} />
            <CustomInput id="phoneNumber" description="Phone Number" value={person.phoneNumber} onChange={handlePersonalChange} />
            <CustomInput id="adress" description="Adress" value={person.adress} onChange={handlePersonalChange} />
          </div>

          <div className="education-list">
            <EducationEditList list={educationList} setList={setEducationList} onChange={handleEducationChange} onAdd={handleAddEducation} />
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
            <EducationRenderList list={educationList} />
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

function EducationRenderList({ list }) {
  if (list.length === 0) return;

  const educationItems = list.map(education =>
    <li key={education.id}>
      <div className="education-time-place">
        <p>{education.startDate} - {education.endDate}</p>
        <p>{education.location}</p>
      </div>

      <div className="entry-info">
        <p><strong>{education.school}</strong></p>
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

function EducationEditList({ list, setList, onChange, onAdd }) {

  function handleDelete(targetId) {
    setList(
      list.filter(item =>
        item.id !== targetId
      )
    )
  }

  const displayedList = list.map((educationItem, index) =>
    <li key={educationItem.id}>
      <EducationItemEdit item={educationItem} onDelete={handleDelete} onEdit={onChange} index={index} />
    </li>
  );
  return (
    <>
      <ul>{displayedList}</ul>
      <button onClick={() => onAdd({
        id: crypto.randomUUID(),
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
        location: ''
      })}>Add</button>
    </>
  )
}

function EducationItemEdit({ item, onEdit, onDelete, index }) {
  const [isEditing, setIsEditing] = useState(false);
  let itemContent;

  if (isEditing) {
    itemContent = (
      <>
        <div className="education-form">
          <CustomInput id="school" description="School" value={item.school} onChange={e => onEdit(index, 'school', e.target.value)} />
          <CustomInput id="degree" description="Degree" value={item.degree} onChange={e => onEdit(index, 'degree', e.target.value)} />
          <CustomInput id="startDate" description="Start Date" value={item.startDate} onChange={e => onEdit(index, 'startDate', e.target.value)} />
          <CustomInput id="endDate" description="End Date" value={item.endDate} onChange={e => onEdit(index, 'endDate', e.target.value)} />
          <CustomInput id="location" description="Location" value={item.location} onChange={e => onEdit(index, 'location', e.target.value)} />
        </div>
        < button onClick={() => setIsEditing(false)}>Save</button >
        <button onClick={() => (onDelete(item.id))}>Delete</button>
      </>
    )
  } else {
    itemContent = (
      <>
        {item.school}
        <button onClick={() => setIsEditing(true)}>Edit</button >
        <button onClick={() => onDelete(item.id)}>Delete</button>
      </>
    )
  }

  return itemContent;
}
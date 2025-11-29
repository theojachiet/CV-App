import { useState } from 'react'
import './App.css'

export default function App() {

  const [person, setPerson] = useState({
    fullName: 'Théophile Jachiet',
    email: 'tjachiet@gmail.com',
    phoneNumber: '+33 6 85 74 84 92',
    address: '33 rue de la paix, 75001, Paris'
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

  const [editingId, setEditingId] = useState(null);

  function handlePersonalChange(e) {
    setPerson({
      ...person,
      [e.target.id]: e.target.value
    })
  }

  function handleEducationChange(id, key, value) {
    setEducationList(list =>
      list.map(item =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
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
            <CustomInput id="address" description="address" value={person.address} onChange={handlePersonalChange} />
          </div>

          <div className="education-list">
            <EducationEditList
              list={educationList}
              setList={setEducationList}
              onChange={handleEducationChange}
              onAdd={handleAddEducation}
              setEditingId={setEditingId}
              editingId={editingId}
            />
          </div>

        </div>

        <div className="cv-container">
          <div className="cv-header">
            <h1>{person.fullName}</h1>

            <div className="info-container">
              <p>{person.email}</p>
              <p>{person.phoneNumber}</p>
              <p>{person.address}</p>
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

function EducationEditList({ list, setList, onChange, onAdd, setEditingId, editingId }) {

  function handleDelete(targetId) {
    setList(
      list.filter(item =>
        item.id !== targetId
      )
    )
  }

  function handleAddItem() {
    const newId = crypto.randomUUID()
    onAdd({
      id: newId,
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      location: ''
    })

    setEditingId(newId);
  }

  const displayedList = list.map((educationItem) =>
    <li key={educationItem.id}>
      <EducationItemEdit item={educationItem} onDelete={handleDelete} onEdit={onChange} id={educationItem.id} setEditingId={setEditingId} editingId={editingId}/>
    </li>
  );
  return (
    <>
      <ul>{displayedList}</ul>
      <button onClick={handleAddItem}>Add</button>
    </>
  )
}

function EducationItemEdit({ item, onEdit, onDelete, id, editingId, setEditingId }) {
  let itemContent;

  if (id === editingId) {
    itemContent = (
      <>
        <div className="education-form">
          <CustomInput id="school" description="School" value={item.school} onChange={e => onEdit(id, 'school', e.target.value)} />
          <CustomInput id="degree" description="Degree" value={item.degree} onChange={e => onEdit(id, 'degree', e.target.value)} />
          <CustomInput id="startDate" description="Start Date" value={item.startDate} onChange={e => onEdit(id, 'startDate', e.target.value)} />
          <CustomInput id="endDate" description="End Date" value={item.endDate} onChange={e => onEdit(id, 'endDate', e.target.value)} />
          <CustomInput id="location" description="Location" value={item.location} onChange={e => onEdit(id, 'location', e.target.value)} />
        </div>
        < button onClick={() => setEditingId(null)}>Save</button >
        <button onClick={() => (onDelete(item.id))}>Delete</button>
      </>
    )
  } else {
    itemContent = (
      <>
        {item.school}
        <button onClick={() => setEditingId(item.id)}>Edit</button >
        <button onClick={() => onDelete(item.id)}>Delete</button>
      </>
    )
  }

  return itemContent;
}
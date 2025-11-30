import { useState } from 'react'
import './App.css'
import './CV.css'

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
  const [educationIsExpanded, setEducationIsExpanded] = useState(false);

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

  function createNewEducation() {
    const newId = crypto.randomUUID()
    handleAddEducation({
      id: newId,
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      location: ''
    })

    setEditingId(newId);
  }

  let educationContent;
  let addEducationContent;

  if (educationIsExpanded) {
      if (!editingId) {
    addEducationContent = <div className="add-education-section">
      <button onClick={createNewEducation}><img src='/src/assets/add.svg' alt='Plus icon' />Education</button>
    </div>
  }
    educationContent = <>
      <EducationEditList
        list={educationList}
        setList={setEducationList}
        onChange={handleEducationChange}
        setEditingId={setEditingId}
        editingId={editingId}
      />
    { addEducationContent }
    </>
  }

  return (
    <>
      <div className="app-container">
        <div className="edit-panel">
          <div className="personal-info">
            <h3>Personal Info</h3>
            <CustomInput id="fullName" description="Full Name" value={person.fullName} onChange={handlePersonalChange} />
            <CustomInput id="email" description="E-mail" value={person.email} onChange={handlePersonalChange} />
            <CustomInput id="phoneNumber" description="Phone Number" value={person.phoneNumber} onChange={handlePersonalChange} />
            <CustomInput id="address" description="Address" value={person.address} onChange={handlePersonalChange} />
          </div>

          <div className="education-list">
            <div className="education-header" onClick={() => setEducationIsExpanded(!educationIsExpanded)}>
              <h3><img src="/src/assets/education.svg" alt="graduation hat" />Education</h3>
              <img src="/src/assets/down.svg" alt="down arrow icon" />
            </div>
            {educationContent}
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

function EducationEditList({ list, setList, onChange, setEditingId, editingId }) {

  function handleDelete(targetId) {
    setList(
      list.filter(item =>
        item.id !== targetId
      )
    )
  }

  //Edit Mode on a Single Item
  if (editingId) {
    const editedItem = list.find(element => element.id === editingId);
    return (
      <li key={editedItem.id} className='editing-item'>
        <EducationItemEdit item={editedItem} onDelete={handleDelete} onEdit={onChange} id={editedItem.id} setEditingId={setEditingId} editingId={editingId} />
      </li>
    )
  }

  //Display Mode for all the elements
  else {
    const displayedList = list.map((educationItem) =>
      <li key={educationItem.id}>
        <EducationItemEdit item={educationItem} onDelete={handleDelete} onEdit={onChange} id={educationItem.id} setEditingId={setEditingId} editingId={editingId} />
      </li>
    );
    return (
      <>
        <ul>{displayedList}</ul>
      </>
    )
  }
}

function EducationItemEdit({ item, onEdit, onDelete, id, editingId, setEditingId }) {
  let itemContent;

  if (id === editingId) {
    itemContent = (
      <>
        <div className="education-form">
          <CustomInput id="school" description="School" value={item.school} onChange={e => onEdit(id, 'school', e.target.value)} />
          <CustomInput id="degree" description="Degree" value={item.degree} onChange={e => onEdit(id, 'degree', e.target.value)} />
          <div className="dates">
            <CustomInput id="startDate" description="Start Date" value={item.startDate} onChange={e => onEdit(id, 'startDate', e.target.value)} />
            <CustomInput id="endDate" description="End Date" value={item.endDate} onChange={e => onEdit(id, 'endDate', e.target.value)} />
          </div>
          <CustomInput id="location" description="Location" value={item.location} onChange={e => onEdit(id, 'location', e.target.value)} />
        </div>
        <div className="options">
          <button className='delete'
            onClick={() => {
              onDelete(item.id);
              setEditingId(null);
            }}>
            <img src='/src/assets/delete.svg' alt='delete icon' />Delete
          </button>
          <button onClick={() => setEditingId(null)} className='save'><img src="/src/assets/save.svg" alt="save icon" />Save</button >
        </div>
      </>
    )
  } else {
    itemContent = (
      <>
        <p>
          {item.school}
        </p>
        <div className="options">
          <button onClick={() => setEditingId(item.id)}><img src='/src/assets/edit.svg' alt='edit icon' /></button>
          <button onClick={() => onDelete(item.id)}><img src='/src/assets/delete.svg' alt='delete icon' /></button>
        </div>
      </>
    )
  }

  return itemContent;
}
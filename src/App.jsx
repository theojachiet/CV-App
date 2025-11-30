import { useState } from 'react'
import './App.css'
import './CV.css'
import {EducationRenderList, EducationEditList} from './Education.jsx';
import { CustomInput } from './utils.jsx';

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
            <button onClick={() => setEducationIsExpanded(!educationIsExpanded)}>
              <div className="education-header">
                <h3><img src="/src/assets/education.svg" alt="graduation hat" />Education</h3>
                <img src="/src/assets/down.svg" alt="down arrow icon" />
              </div>
            </button>
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
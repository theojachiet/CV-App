import { useState } from 'react'
import html2pdf from "html2pdf.js/dist/html2pdf.bundle.min";
import './App.css'
import './CV.css'
import { EducationRenderList, EducationEditList } from './Education.jsx';
import { CustomInput } from './utils.jsx';
import { ExperienceRenderList, ExperienceEditList } from './Experience.jsx';

function downloadPDF() {
  const cvElement = document.getElementById("cv-display");

  const options = {
    margin: 0,
    filename: 'cv.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 3 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(cvElement).save();
}

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

  const [experienceList, setExperienceList] = useState([{
    id: crypto.randomUUID(),
    company: 'France Travail',
    position: 'Electricien éclairagiste',
    startDate: 2020,
    endDate: 'present',
    location: 'Paris',
    description: 'qsdmlfkj qosfj lqkmdsfj klqdshfk ljqsdhflkj qdsflkjh qkjlsdfh kjlqsh f klqhs fdk ljqshfkjl qdsiul fu zaioufqdsioufh iouq sdhfiuoqsdfiouqdshiuof dhsq'
  }])

  const [educationEditingId, setEducationEditingId] = useState(null);
  const [experienceEditingId, setExperienceEditingId] = useState(null);
  const [educationIsExpanded, setEducationIsExpanded] = useState(false);
  const [experienceIsExpanded, setExperienceIsExpanded] = useState(false);

  //Handle changes
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

  function handleExperienceChange(id, key, value) {
    setExperienceList(list =>
      list.map(item =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  }

  //handle Adding items
  function handleAddEducation(newEducation) {
    setEducationList([
      ...educationList,
      newEducation
    ])
  }

  function handleAddExperience(newExperience) {
    setExperienceList([
      ...experienceList,
      newExperience
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

  function createNewExperience() {
    const newId = crypto.randomUUID()
    handleAddExperience({
      id: newId,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: ''
    })

    setEditingId(newId);
  }

  let addEducationContent;
  if (educationIsExpanded) {
    if (!educationEditingId) {
      addEducationContent = <div className="add-education-section">
        <button onClick={createNewEducation}><img src='/assets/add.svg' alt='Plus icon' />Education</button>
      </div>
    }
  }

  let educationContent = <>
    <EducationEditList
      list={educationList}
      setList={setEducationList}
      onChange={handleEducationChange}
      setEditingId={setEducationEditingId}
      editingId={educationEditingId}
    />
    {addEducationContent}
  </>

  let addExperienceContent;
  if (experienceIsExpanded) {
    if (!experienceEditingId) {
      addExperienceContent = <div className="add-experience-section">
        <button onClick={createNewExperience}><img src='/assets/add.svg' alt='Plus icon' />Experience</button>
      </div>
    }
  }

  let experienceContent = <>
    <ExperienceEditList
      list={experienceList}
      setList={setExperienceList}
      onChange={handleExperienceChange}
      setEditingId={setExperienceEditingId}
      editingId={experienceEditingId}
    />
    {addExperienceContent}
  </>

  function handleEducationToggle() {
    setEducationIsExpanded(!educationIsExpanded);
    if (educationIsExpanded) setExperienceIsExpanded(false);
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
            <button onClick={handleEducationToggle} className={`education-toggle ${(educationIsExpanded) ? "open" : ""}`}>
              <h3><img src="/assets/education.svg" alt="graduation hat" />Education</h3>
              <img src="/assets/down.svg" alt="down arrow icon" className={`arrow ${educationIsExpanded ? "rotated" : ""}`} />
            </button>
            <div className={`education-content ${educationIsExpanded ? "expanded" : ""}`}>{educationContent}</div>
          </div>

          <div className="experience-list">
            <button onClick={() => setExperienceIsExpanded(!experienceIsExpanded)} className={`experience-toggle ${(experienceIsExpanded) ? "open" : ""}`}>
              <h3><img src="/assets/experience.svg" alt="graduation hat" />Professionnal Experiences</h3>
              <img src="/assets/down.svg" alt="down arrow icon" className={`arrow ${experienceIsExpanded ? "rotated" : ""}`} />
            </button>
            <div className={`experience-content ${experienceIsExpanded ? "expanded" : ""}`}>{experienceContent}</div>
          </div>

          <button className='pdf' onClick={downloadPDF}>Download CV as PDF</button>

        </div>

        <div id='cv-display' className="cv-container">
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
            <ExperienceRenderList list={experienceList} />
          </div>
        </div>
      </div>
    </>
  )
}
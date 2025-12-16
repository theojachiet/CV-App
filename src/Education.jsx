import { CustomInput } from "./utils.jsx";

export function EducationRenderList({ list }) {
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

export function EducationEditList({ list, setList, onChange, setEditingId, editingId }) {

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

export function EducationItemEdit({ item, onEdit, onDelete, id, editingId, setEditingId }) {
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
            <img src='/assets/delete.svg' alt='delete icon' />Delete
          </button>
          <button onClick={() => setEditingId(null)} className='save'><img src="/assets/save.svg" alt="save icon" />Save</button >
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
          <button onClick={() => setEditingId(item.id)}><img src='/assets/edit.svg' alt='edit icon' /></button>
          <button onClick={() => onDelete(item.id)}><img src='/assets/delete.svg' alt='delete icon' /></button>
        </div>
      </>
    )
  }

  return itemContent;
}
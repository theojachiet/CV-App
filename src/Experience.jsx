import { CustomInput, CustomTextArea } from "./utils.jsx";

export function ExperienceRenderList({ list }) {
    if (list.length === 0) return;

    const experienceItems = list.map(experience =>
        <li key={experience.id}>
            <div className="education-time-place">
                <p>{experience.startDate} - {experience.endDate}</p>
                <p>{experience.location}</p>
            </div>

            <div className="entry-info">
                <p><strong>{experience.company}</strong></p>
                <p>{experience.position}</p>
                <p>{experience.description}</p>
            </div>
        </li>
    )

    return (
        <article>
            <h2>Professionnal Experiences</h2>
            <ul>{experienceItems}</ul>
        </article>
    )
}

export function ExperienceEditList({ list, setList, onChange, setEditingId, editingId }) {

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
                <ExperienceItemEdit item={editedItem} onDelete={handleDelete} onEdit={onChange} id={editedItem.id} setEditingId={setEditingId} editingId={editingId} />
            </li>
        )
    }

    //Display Mode for all the elements
    else {
        const displayedList = list.map((experienceItem) =>
            <li key={experienceItem.id}>
                <ExperienceItemEdit item={experienceItem} onDelete={handleDelete} onEdit={onChange} id={experienceItem.id} setEditingId={setEditingId} editingId={editingId} />
            </li>
        );
        return (
            <>
                <ul>{displayedList}</ul>
            </>
        )
    }
}

export function ExperienceItemEdit({ item, onEdit, onDelete, id, editingId, setEditingId }) {
    let itemContent;

    if (id === editingId) {
        itemContent = (
            <>
                <div className="experience-form">
                    <CustomInput id="company" description="Company Name" value={item.company} onChange={e => onEdit(id, 'company', e.target.value)} />
                    <CustomInput id="position" description="Position Title" value={item.position} onChange={e => onEdit(id, 'position', e.target.value)} />
                    <div className="dates">
                        <CustomInput id="startDate" description="Start Date" value={item.startDate} onChange={e => onEdit(id, 'startDate', e.target.value)} />
                        <CustomInput id="endDate" description="End Date" value={item.endDate} onChange={e => onEdit(id, 'endDate', e.target.value)} />
                    </div>
                    <CustomInput id="location" description="Location" value={item.location} onChange={e => onEdit(id, 'location', e.target.value)} />
                    <CustomTextArea id="description" description="Description" value={item.description} onChange={e => onEdit(id, 'description', e.target.value)} />
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
                    {item.company}
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
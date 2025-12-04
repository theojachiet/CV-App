export function CustomInput({ id, description, value, onChange }) {
  return (
    <label htmlFor={id}>{description}
      <input type="text" id={id} value={value} onChange={onChange} />
    </label>
  )
}

export function CustomTextArea({ id, description, value, onChange }) {
  return (
    <label htmlFor={id}>{description}
      <textarea id={id} value={value} onChange={onChange} />
    </label>
  )
}
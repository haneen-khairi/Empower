import React from 'react'

export default function SelectMenuField({
    type,
    initialValue = "",
    name,
    style,
    label,
    id,
    errors,
    items = [],
    readonly = false,
    register = null,
    errorMessage = {},

}) {
  return <>
  <select
        name={name}
        className="form__group--input"
        id={id}
        type={type}
        defaultValue={initialValue}
        style={style}
        readOnly={readonly}
        {...register(name, errorMessage )}
      >
    <option value="">{initialValue}</option>
    {items.map((item, index) => <option key={index} value={item}>{item}</option> )}
      </select>
    {errors[name] && <span className="error">{errors[name].message}</span>}

  </>
}

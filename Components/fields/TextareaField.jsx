

export default function TextareaField({
    initialValue = "",
    name,
    style,
    label,
    id,
    errors,
    placeholder = `Please type some text`,
    readonly = false,
    // register = null,
    // errorMessage = {},
    validations = [],
    maxLength = 1000,

}) {

  return <>
  {/* <label htmlFor={id}>{label}</label> */}
   <textarea
      maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        className="form__group--textarea"
        id={id}
        defaultValue={initialValue}
        style={style}
        readOnly={readonly}
        // {...register(name, errorMessage )}
      ></textarea>
    {/* {errors[name] && <span className="error">{errors[name].message}</span>} */}

  </>
}

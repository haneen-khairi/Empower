import { Input } from '@nextui-org/react'
import React from 'react'
import SiteImage from '../UI/SiteImage'
import { EyeSlashFilledIcon } from '@/icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '@/icons/EyeFilledIcon';

export default function InputField({
    type,
    initialValue = "",
    name,
    style,
    label,
    id,
    errors,
    placeholder = `Please enter your ${name}`,
    readonly = false,
    // register = null,
    // errorMessage = {},
    maxLength = 250,

}) {
  // Create an object to store the visibility state for each input
  const inputVisibility = {};

  const toggleVisibility = (id) => {
    // Toggle the visibility for the input with the given id
    inputVisibility[id] = !inputVisibility[id];
  };
  return <>
  {/* <label htmlFor={id}>{label}</label> */}
  {type === 'email' ? <Input
      maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        // className="form__group--input"
        classNames={{
          input: [
            "form__group--input--main"
          ],
          inputWrapper: [
            "form__group--input"
          ]

        }}
        id={id}
        type={type}
        defaultValue={initialValue}
        style={style}
        readOnly={readonly}
        startContent={
          <SiteImage className='logo' src={'/assets/images/mail.svg'} />
        }
        // {...register(name, errorMessage )}
      /> : type === 'password' ? 
      <Input
      maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        id={id}
        classNames={{
          input: [
            "form__group--input--main"
          ],
          inputWrapper: [
            "form__group--input"
          ]

        }}
        
        defaultValue={initialValue}
        style={style}
        readOnly={readonly}
        startContent={
          <SiteImage className='logo' src={'/assets/images/password.svg'} />
        }
        endContent={
          <button className="focus:outline-none form__group--input-password" type="button" onClick={() => toggleVisibility(id)}>
            {inputVisibility[id] ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={inputVisibility[id] ? "text" : type}
        // {...register(name, errorMessage )}
      />
      : <Input
      maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        className="form__group--input"
        id={id}
        type={type}
        defaultValue={initialValue}
        style={style}
        readOnly={readonly}
        // {...register(name, errorMessage )}
      />}
    {/* {errors[name] && <span className="error">{errors[name].message}</span>} */}

  </>
}

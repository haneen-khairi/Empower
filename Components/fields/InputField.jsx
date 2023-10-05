import { Input } from '@nextui-org/react'
import React, { useState } from 'react'
import SiteImage from '../UI/SiteImage'
import { EyeSlashFilledIcon } from '@/icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '@/icons/EyeFilledIcon';

export default function InputField({
    type,
    initialValue = "",
    name,
    style,
    label,
    className,
    id,
    errors,
    placeholder = `Please type some text`,
    readonly = false,
    // register = null,
    // errorMessage = {},
    validations = [],
    maxLength = 250,

}) {
  // Create an object to store the visibility state for each input
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
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
          <SiteImage className='icon' src={'/assets/images/mail.svg'} />
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
          <SiteImage className='icon' src={'/assets/images/password.svg'} />
        }
        endContent={
          <button className="focus:outline-none form__group--input-password" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        // {...register(name, errorMessage )}
      />
      : className === 'verify' ? <Input
      maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        id={id}
        classNames={{
          input: [
            "form__group--input--main"
          ],
          inputWrapper: [
            "form__group--verify",
            
          ]

        }}
        type={type}
        defaultValue={initialValue}
        style={style}
        readOnly={readonly}
        // {...register(name, errorMessage )}
      />
      : <Input
      maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        id={id}
        classNames={{
          input: [
            "form__group--input--main"
          ],
          inputWrapper: [
            "form__group--input",
            
          ]

        }}
        type={type}
        defaultValue={initialValue}
        style={style}
        readOnly={readonly}
        // {...register(name, errorMessage )}
      />}
    {/* {errors[name] && <span className="error">{errors[name].message}</span>} */}

  </>
}

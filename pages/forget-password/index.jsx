import AuthCard from '@/Components/UI/AuthCard'
import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import { emailRegex } from '@/Functions/RegexFunction'
import MainLayout from '@/Layouts/MainLayout'
import { Button, Checkbox } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function index() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange'
  });
  function onSubmitForgetPassword(data){
    console.log('===forget===' , data)
    reset()
  }
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Forget password`}</title>
    </Head>
    <section className='login'>
      <AuthCard title='Forgot Password' text='To proceed with reseting your password, please provide your email address' logo={false}>
        <form onSubmit={handleSubmit(onSubmitForgetPassword)}>
          <div className="grid grid-cols-1 gap-y-[24px]">
            <InputField register={register} 
            errorMessage={{ required: 'Email is required' , 
            pattern: {
              value: emailRegex,
                  // Change this regex pattern as needed
              message: "Email is invalid",
              },
            }}
            errors={errors}
            name='email' label={''} placeholder={'Email (Required)'} id={'email'} type={'email'} maxLength={200} />
            
            <Button className='special_button' disabled={!isValid ? true : false} type='submit'>Next</Button>
          </div>

        </form>
      </AuthCard>
    </section>
  </MainLayout>
  
}

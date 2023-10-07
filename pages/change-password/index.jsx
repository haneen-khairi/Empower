import AuthCard from '@/Components/UI/AuthCard'
import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import { passwordRegex } from '@/Functions/RegexFunction'
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
  function onSubmitChangePassword(data){
    console.log('===submit password===', data)
    // reset()
  }
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Change Password`}</title>
    </Head>
    <section className='login'>
      <AuthCard title='Change Password' text='To proceed with changing your password, please provide your current password' logo={false}>
        <form onSubmit={handleSubmit(onSubmitChangePassword)}>
          <div className="grid grid-cols-1">
            <InputField 
            register={register}
            errors={errors}
            errorMessage={{ required: 'Password is required' , 
            pattern: {
              value: passwordRegex,
                  // Change this regex pattern as needed
              message: "Password is invalid",
              },
            }}
            name='password' label={''} placeholder={'Password (Required)'} id={'password'} type={'password'} maxLength={200} />
            <div className="flex justify-end mb-[24px]">
                <Link href={'/forget-password'} className='login__remember--forget'>Forgot Password?</Link>

            </div>
            <Button className='special_button' type='submit' disabled={!isValid ? true : false}>Next</Button>
          </div>

        </form>
      </AuthCard>
    </section>
  </MainLayout>
  
}

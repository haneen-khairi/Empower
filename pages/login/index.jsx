import AuthCard from '@/Components/UI/AuthCard'
import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import MainLayout from '@/Layouts/MainLayout'
import { Button, Checkbox } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function index() {
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Home`}</title>
    </Head>
    <section className='login'>
      <AuthCard title='Login to your account' text='Please enter your credentials to login to your account'>
        <form onSubmit={e => e.preventDefault}>
          <div className="grid grid-cols-1 gap-y-[24px]">
            <InputField name='email' label={''} placeholder={'adeeb@mail.com'} id={'email'} type={'email'} maxLength={200} />
            <InputField name='password' label={''} placeholder={`••••••••`} id={'password'} type={'password'} maxLength={200} />
            <div className="login__remember">
              <Checkbox defaultSelected>Remember Me</Checkbox>
              <Link href={'/forgetPassword'} className='login__remember--forget'>Forgot Password?</Link>
            </div>
            <Button className='special_button'>Login</Button>
          </div>

        </form>
        <div className="flex justify-center">
          <p>Not Registered Yet?</p>
          <Link href={'/createAccount'}>Create Account <SiteImage src={'/assets/images/chevron_right.svg'} /></Link>
        </div>
      </AuthCard>
    </section>
  </MainLayout>
  
}

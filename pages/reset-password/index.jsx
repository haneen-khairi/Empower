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
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Reset password`}</title>
    </Head>
    <section className='login'>
      <AuthCard title='Set a new Password' text='Please set a new password to update it to your account' logo={false}>
        <form onSubmit={e => e.preventDefault}>
          <div className="grid grid-cols-1 gap-y-[24px]">
            <InputField name='password' label={''} placeholder={`Password (Required)`} id={'password'} type={'password'} maxLength={200} />
            <InputField name='confirmPassword' label={''} placeholder={`Confirm Password (Required)`} id={'confirmPassword'} type={'password'} maxLength={200} />
            
            <Button className='special_button'>Save</Button>
          </div>

        </form>
        <div className="dont_have_acoount flex justify-center">
          <p>Not Registered Yet?</p>
          <Link href={'/createAccount'}>Create Account <SiteImage src={'/assets/images/chevron_right.svg'} /></Link>
        </div>
      </AuthCard>
    </section>
  </MainLayout>
  
}

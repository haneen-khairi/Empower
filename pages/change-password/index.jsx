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
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Change email`}</title>
    </Head>
    <section className='login'>
      <AuthCard title='Change Password' text='To proceed with changing your password, please provide your current password' logo={false}>
        <form onSubmit={e => e.preventDefault}>
          <div className="grid grid-cols-1 gap-y-[24px]">
            <InputField name='password' label={''} placeholder={'Password (Required)'} id={'password'} type={'password'} maxLength={200} />
            <div className="flex justify-end">
                <Link href={'/forget-password'} className='login__remember--forget'>Forgot Password?</Link>

            </div>
            <Button className='special_button'>Next</Button>
          </div>

        </form>
      </AuthCard>
    </section>
  </MainLayout>
  
}

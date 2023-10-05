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
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Forget password`}</title>
    </Head>
    <section className='login'>
      <AuthCard title='Set a new Email' text='Please set a new email to update it to your account' logo={false}>
        <form onSubmit={e => e.preventDefault}>
          <div className="grid grid-cols-1 gap-y-[24px]">
            <InputField name='email' label={''} placeholder={'Email (Required)'} id={'email'} type={'email'} maxLength={200} />
            
            <Button className='special_button' type='submit'>Save</Button>
          </div>

        </form>
      </AuthCard>
    </section>
  </MainLayout>
  
}

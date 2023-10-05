import AuthCard from '@/Components/UI/AuthCard'
import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import MainLayout from '@/Layouts/MainLayout'
import { Button } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function index() {
    function resendCode(){
        console.log('=====resend=====')
    }
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Verify Email`}</title>
    </Head>
    <section className='login'>
      <AuthCard title='Verify your email' text='To proceed with resetting your password, please check your email and enter the code sent' logo={false}>
        <form onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-5 gap-x-[24px]">
            <InputField className="verify" name='number1' label={''} placeholder={``} id={'number1'} type={'number'} maxLength={1} />
            <InputField className="verify" name='number2' label={''} placeholder={``} id={'number2'} type={'number'} maxLength={1} />
            <InputField className="verify" name='number3' label={''} placeholder={``} id={'number3'} type={'number'} maxLength={1} />
            <InputField className="verify" name='number4' label={''} placeholder={``} id={'number4'} type={'number'} maxLength={1} />
            <InputField className="verify" name='number5' label={''} placeholder={``} id={'number5'} type={'number'} maxLength={1} />
            
          </div>
            <Button className='special_button w-full'>Verify</Button>

        </form>
        <div className="dont_have_acoount flex justify-center">
          <p>Haven’t received a code?</p>
          <Button onClick={resendCode}>Resend Code <SiteImage src={'/assets/images/chevron_right.svg'} /></Button>
        </div>
      </AuthCard>
    </section>
  </MainLayout>
  
}

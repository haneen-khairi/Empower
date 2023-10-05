import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import TextareaField from '@/Components/fields/TextareaField'
import MainLayout from '@/Layouts/MainLayout'
import { Button } from '@nextui-org/react'
import Head from 'next/head'
import React from 'react'

export default function index() {
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Contact us`}</title>
    </Head>
    <section className='contact'>
      <div className="grid grid-cols-2 gap-[120px] items-center">
        <div className="contact__content">
          <h1 className="contact__content--header">Get In Touch</h1>
          <p className='contact__content--paragraph'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500st has survived not only five centuries.</p>
          <form >
          <InputField name='full_name' label={''} placeholder={'Full Name'} id={'full_name'} type={'text'} maxLength={200} />
          <InputField name='email' label={''} placeholder={'adeeb@mail.com'} id={'email'} type={'email'} maxLength={200} />
          <InputField name='phone_number' label={''} placeholder={'Phone Number'} id={'phone_number'} type={'number'} maxLength={200} />
          <TextareaField name='message' label={''} placeholder={'Message'} id={'message'}  maxLength={1000} />
            <Button type='submit' className='special_button contact__content--button'>Send</Button>
          </form>
        </div>
        <SiteImage src={'assets/images/contact-us-shape.svg'} />
      </div>
    </section>
  </MainLayout>
}

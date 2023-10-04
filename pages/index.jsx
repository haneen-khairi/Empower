import SiteImage from '@/Components/UI/SiteImage'
import MainLayout from '@/Layouts/MainLayout'
import { Button, Image } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function index() {
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Home`}</title>
    </Head>
    <section className="homecover">
      <div className="flex justify-center items-center">
        <div className="homecover__content w-8/12">
            <h1 className='homecover__content--header mb-[16px]'>Discover Your Cognitive Insights!</h1>
            <p className='homecover__content--paragraph mb-[16px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
            <Button as={Link} href='' className="homecover__content--button special_button">Start Now</Button>
        </div>
        <Image className='w-4/12' src='/assets/images/home_cover.svg' removeWrapper={true} />
      </div>
    </section>
    <section className="what mb-[160px]">
      <div className="grid grid-cols-2 justify-center gap-[120px] items-center">
        <SiteImage  src='/assets/images/what-are-we.svg' />
      <div className="what__content ">
        <SiteImage className="what__content--shape" src='/assets/images/what-are-we-shape.svg' />
        
            <h3 className='what__content--header mb-[16px]'>Who Are We?</h3>
            <p className='what__content--paragraph mb-[16px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
        </div>
      </div>
    </section>

    <section className="our_keys">
      <div className="our_keys__content">
        <h3 className="our_keys__content--header">Our Key Features</h3>
        <p className="our_keys__content--paragraph">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>

        <div className="grid grid-cols-3 gap-x-[240px]">
          <div className="our_keys__content--card">
              <h4 className="our_keys__content--card-header">6,000+</h4>
              <p className="our_keys__content--card-paragraph">Quizzes Taken</p>
          </div>
          <div className="our_keys__content--card">
              <h4 className="our_keys__content--card-header">2,500</h4>
              <p className="our_keys__content--card-paragraph">Results given</p>
          </div>
          <div className="our_keys__content--card">
              <h4 className="our_keys__content--card-header">120+</h4>
              <p className="our_keys__content--card-paragraph">Meetings Initiated</p>
          </div>
        </div>
      </div>
    </section>

  </MainLayout>
}

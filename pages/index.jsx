import SiteImage from '@/Components/UI/SiteImage'
import { UserContext } from '@/Context/AuthContext'
import MainLayout from '@/Layouts/MainLayout'
import { Button, Image } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'

export default function index() {
  const route = useRouter()
  const {token , getToken} = useContext(UserContext)
  function onNavigateMeeting(){
    route.push('/')
  }
  useEffect(() => {
    if(!route.isReady){
      return
    }
    getToken()
    return () => {
      
    }
  }, [route , token])
  
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Home`}</title>
    </Head>
    {token ? 
      <section className="meeting section__single">
        <div className={`card card__empty card__meeting`}>
        <SiteImage className='card__empty--image' src={'/assets/images/icon_calender.svg'} />
        <div className="card__empty--content">
            <h4 className='card__empty--content-header'>
            Upcoming meeting
            </h4>
            <h6 className="card__meeting--title">Uplift Expert</h6>
            <span className="card__meeting--span">Meeting on</span>
            <h5 className="card__meeting--date">17th July - 5:30 PM</h5>
            <p className='card__empty--content-paragraph'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p>
            <Button type='submit' disabled className="card__meeting--button special_button" onClick={onNavigateMeeting}>Join</Button>
        </div>
    </div>
      </section>
    : <>
      <section className="homecover">
        <div className="lg:flex justify-center items-center">
          <div className="homecover__content lg:w-8/12 md:w-12/12 md:mb-[40px]">
              <h1 className='homecover__content--header mb-[16px]'>Discover Your Cognitive Insights!</h1>
              <p className='homecover__content--paragraph mb-[16px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
              <Button as={Link} href='' className="homecover__content--button special_button">Start Now</Button>
          </div>
          <Image className='lg:w-4/12 md:w-12/12 w-full' src='/assets/images/home_cover.svg' removeWrapper={true} />
        </div>
      </section>
      <section className="what mb-[160px]">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 justify-center gap-[120px] items-center">
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

          <div className="grid lg:grid-cols-3 md:grid-cols-2  lg:gap-x-[240px] md:gap-x-[60px]">
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
    </> }

  </MainLayout>
}

import AuthCard from '@/Components/UI/AuthCard'
import EmptyStateCard from '@/Components/UI/EmptyStateCard'
import SiteImage from '@/Components/UI/SiteImage'
import TestsCard from '@/Components/UI/TestsCard'
import InputField from '@/Components/fields/InputField'
import MainLayout from '@/Layouts/MainLayout'
import { Button, Checkbox } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import  { useEffect, useState } from 'react'

export default function index() {
  const route = useRouter()
  const [tests, setTests] = useState([
    's'
  ])
  useEffect(() => {
    if(!route.isReady){
      return
    }
  
    return () => {
      
    }
  }, [route])
  
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Tests`}</title>
    </Head>
    {tests.length > 0 ? <section className='tests'>
      <div className="tests__content">
        <h4 className="tests__content--header">Tests</h4>
        <p className="tests__content--paragraph">We recommend you take the following tests</p>
      </div>
      <div className="tests__cards">
        <div className="grid grid-col-1">
          <div className="tests__cards--full">
            <h4 className="tests__cards--full-header">Your Brain Profile Assessment Results</h4>
            <p className="tests__cards--full-paragraph">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            <Button color='white' className="tests__cards--full-button">
            Download PDF <SiteImage src={'/assets/images/download_icon.svg'} />
            </Button>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 lg:grid-cols-1 lg:gap-x-[40px] sm:mb-[24px]  ">
          <TestsCard imageSrc={'/assets/images/test1.svg'} title={'The Brain Profile Assessement'} />
          <TestsCard imageSrc={'/assets/images/test2.svg'} title={'TOEFL Exam'} />
        </div>
      </div>
    </section> : <section className='section_single'>
       <EmptyStateCard className='card__test' imageSrc='/assets/images/empty-test.svg' title="You haven’t reached the test yet" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." />
    </section>}
  </MainLayout>
  
}

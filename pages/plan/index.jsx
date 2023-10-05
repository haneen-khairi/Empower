import EmptyStateCard from '@/Components/UI/EmptyStateCard'
import PlansPage from '@/Components/plans/PlansPage'
import MainLayout from '@/Layouts/MainLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect , useState } from 'react'

export default function index() {
  const [plans, setPlans] = useState([
    {
      eventName: 'Event Name',
      eventParagraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",

    }
  ])
  const route = useRouter()
  useEffect(() => {
    if(!route.isReady){
      return
    }
    
    return () => {
      
    }
  }, [route])
  
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Plan`}</title>
    </Head>
    <section className={plans.length > 0 ? '' : 'section__single' }>
      {plans.length > 0 ? <PlansPage /> :<EmptyStateCard className='card__plan' imageSrc='/assets/images/empty-plan.svg' title="You haven’t reached the test yet" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." />}
    </section>
  </MainLayout>
  
}

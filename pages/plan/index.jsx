import EmptyStateCard from '@/Components/UI/EmptyStateCard'
import PlansPage from '@/Components/plans/PlansPage'
import MainLayout from '@/Layouts/MainLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect , useRef, useState } from 'react'
import {useSnackbar} from '@/custom-hooks/useSnackbar'
import SiteImage from '@/Components/UI/SiteImage'
export default function index() {
  const showSnackbar = useSnackbar()
  const route = useRouter()
  const [plans, setPlans] = useState([
    {
      eventName: 'Event Name',
      eventParagraph: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",

    }
  ])
  // const handleUndo = (id) => {
  //   console.log('=== handleUndo ===', id);
  //   // setUndoClicked(true); // Mark the "Undo" button as clicked
  // };
  // const Undo = (id) => {
  //   console.log('==Undo id==' , id)
  //   return <h3>
  //     “Event Name” has been moved to completed <button onClick={() => handleUndo(id)}><SiteImage src={'/assets/images/undo.svg'} /> Undo?</button>
  //   </h3>
    
  // };

  // function completePlan(id){
  //   console.log('=== complete plan ===')
  //   showSnackbar(Undo(1) , 'dark')
  //   setTimeout(() => {
  //     callCompletedDone()
  //   }, 2500);
  // }
  // function callCompletedDone(){
  //   console.log('===mission done===')
  // }

  const shouldExecute = useRef(true);

  function completePlan() {
    console.log('=== complete plan ===');
    showSnackbar(Undo, 'dark');

    if (shouldExecute.current) {
      setTimeout(() => {
        if (shouldExecute.current) {
          callCompletedDone();
        }
      }, 2500);
    }
  }

  function callCompletedDone() {
    if (shouldExecute.current) {
      console.log('=== mission done ===');
    }
  }

  const handleUndo = () => {
    console.log('=== undo ===');
    // setUndoClicked(true); // Mark the "Undo" button as clicked
    shouldExecute.current = false; // Set the flag to prevent callCompletedDone from executing
    setTimeout(() => {
      shouldExecute.current = true
    }, 2500);
  };
  const Undo = () => {

    return (
      <h3>
        “Event Name” has been moved to completed{' '}
        <button onClick={handleUndo}>
          <SiteImage src={'/assets/images/undo.svg'} /> Undo?
        </button>
      </h3>
    );
  };
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
      {plans.length > 0 ? <PlansPage plans={plans} onMarkPlansPage={completePlan} /> :<EmptyStateCard className='card__plan' imageSrc='/assets/images/empty-plan.svg' title="You haven’t reached the test yet" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." />}
    </section>
  </MainLayout>
  
}

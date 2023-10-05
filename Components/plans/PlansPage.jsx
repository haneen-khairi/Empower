import { CircularProgress } from '@nextui-org/react'
import React from 'react'
import PlansCard from './PlansCard'

export default function PlansPage() {
    return <div className='plans'>
        <div className="plans__progress">
            <CircularProgress
                aria-label="Loading..."
                size="lg"
                value={30}
                color="success"
                showValueLabel={true}
            />
            <h4 className='plans__progress--text'>Status of plan completion</h4>
        </div>
        <div className="plans__cards">
            <div className="grid grid-cols-3" style={{gap: '64px'}}>
                <div className="plans__cards_section">
                    <h4 className='plans__cards_section--header'>Past Due <div className="badge past">5</div></h4>
                    <div className="grid grid-cols-1">
                        <PlansCard title={'Event Name'} text={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}  type={'past'} date={'12, July, 2023'}  />
                    </div>
                </div>
                <div className="plans__cards_section">
                    <h4 className='plans__cards_section--header'>To Do <div className="badge to_do">5</div></h4>
                    <div className="grid grid-cols-1">
                    <PlansCard title={'Event Name'} text={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}  type={'to_do'} date={'12, July, 2023'}  />
                    </div>
                </div>
                <div className="plans__cards_section">
                    <h4 className='plans__cards_section--header'>Done <div className="badge done">5</div></h4>
                    <div className="grid grid-cols-1">
                    <PlansCard title={'Event Name'} text={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}  type={'done'} date={'12, July, 2023'}  />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

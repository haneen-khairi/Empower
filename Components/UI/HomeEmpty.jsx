import React from 'react'
import SiteImage from './SiteImage'

export default function HomeEmpty() {
  return <div className='meeting__empty'>
    <div className="grid lg:grid-cols-3 md:grid-col-1 items-center">
        <div className="lg:col-span-2">
            <h3 className="meeting__empty--header">
                your status
            </h3>
            <div className="meeting__empty--status mb-[8px]">
                <SiteImage 
                src={'/assets/images/folder-new-design/13.svg'}
                className='meeting__empty--status-image'
                />
                <p className='meeting__empty--status-text'>Your Journey will start soon!</p>
            </div>
            <h3 className="meeting__empty--header">
                Empwr360 Events
            </h3>
            <div className="meeting__empty--status">
                <SiteImage 
                src={'/assets/images/folder-new-design/12.svg'}
                className='meeting__empty--status-image'
                />
                <p className='meeting__empty--status-text'>Stay tuned for excited Events!</p>
            </div>
        </div>
        <div className="lg:col-span-1">
        <SiteImage 
                src={'/assets/images/folder-new-design/11.svg'}
                className='w-full'
                />
        </div>
    </div>
  </div>
}

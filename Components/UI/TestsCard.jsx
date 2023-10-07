import React from 'react'
import SiteImage from './SiteImage'

export default function TestsCard({
    imageSrc,
    title,
    link
}) {
  return <div className="card card__tests">
    <SiteImage className='w-full' src={imageSrc} />
    <div className="card__tests--body flex items-center">
        <SiteImage src={'/assets/images/link.svg'} />
        <h4 className='card__tests--body-title'>{title}</h4>
    </div>
  </div>
}

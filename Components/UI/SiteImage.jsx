import { Image } from '@nextui-org/react'
import React from 'react'

export default function SiteImage({
    src,
    className = ""
}) {
  return <Image className={className} removeWrapper={true} src={src}  />
}

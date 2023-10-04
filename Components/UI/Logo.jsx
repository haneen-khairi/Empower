import { Image } from '@nextui-org/react'
import React from 'react'

export default function Logo({
    width = 55 ,
    height = 55 ,
    src = "/assets/images/Logo/logo.svg"
}) {
  return <Image src={src} removeWrapper={true} width={width} height={height} />
}

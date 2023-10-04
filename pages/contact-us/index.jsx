import MainLayout from '@/Layouts/MainLayout'
import Head from 'next/head'
import React from 'react'

export default function index() {
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Contact us`}</title>
    </Head>
      <div>Copntact us</div>
  </MainLayout>
}

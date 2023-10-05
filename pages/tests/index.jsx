import AuthCard from '@/Components/UI/AuthCard'
import EmptyStateCard from '@/Components/UI/EmptyStateCard'
import SiteImage from '@/Components/UI/SiteImage'
import InputField from '@/Components/fields/InputField'
import MainLayout from '@/Layouts/MainLayout'
import { Button, Checkbox } from '@nextui-org/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function index() {
  return <MainLayout>
    <Head>
      <title>{`${process.env.NEXT_PUBLIC_TITLE}Tests`}</title>
    </Head>
    <section className='login'>
      <EmptyStateCard className='card__test' imageSrc='/assets/images/empty-test.svg' title="You haven’t reached the test yet" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." />
    </section>
  </MainLayout>
  
}

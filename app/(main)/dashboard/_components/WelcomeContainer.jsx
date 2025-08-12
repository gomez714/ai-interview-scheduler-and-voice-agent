'use client'
import { useUser } from '@/app/provider'
import Image from 'next/image'
import React from 'react'

function WelcomeContainer() {

    const {user} = useUser();
  return (
    <div className='bg-secondary p-5 rounded-xl flex justify-between items-center'>
        <div >
            <h2 className='text-lg font-bold'>Welcome {user?.name}</h2>
            <h2 className='text-gray-500'>AI-Driven Interviews, Hassle-Free Hiring</h2>
        </div>
        {user && <Image src={user?.image_url} alt="user Avatar" width={40} height={40} className='rounded-full' />}
    </div>
  )
}

export default WelcomeContainer
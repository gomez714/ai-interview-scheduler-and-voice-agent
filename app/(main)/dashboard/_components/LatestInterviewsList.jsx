'use client'
import { Button } from '@/components/ui/button';
import { Video, Plus } from 'lucide-react';
import React, { useState, useEffect } from 'react'

function LatestInterviewsList() {
    const [interviewList, setInterviewList] = useState([]);

   
  return (
    <div>
        <div className="my-5">
            <h2 className='font-bold text-2xl'>Previously Created Interviews</h2>

            {interviewList?.length === 0 && (
                <div className='p-5 flex flex-col items-center gap-3 mt-5'>
                    <Video className='h-12 w-12 p-2 text-primary bg-blue-100 rounded-lg' />
                    <h2 className='font-bold'>No Interviews Created Yet</h2>
                    <Button>
                        <Plus />
                        Create New Interview
                    </Button>
                </div>
            )}
        </div>
    </div>
  )
}

export default LatestInterviewsList
'use client'
import React, { useState } from 'react'
import InterviewHeader from './_components/InterviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'

function InterviewLayout({ children }) {
    const [interviewInfo, setInterviewInfo] = useState(null);

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
        <div>
            <InterviewHeader />
            {children}
        </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout
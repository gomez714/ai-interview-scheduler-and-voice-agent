'use client'
import React, { useState, useMemo } from 'react'
import InterviewHeader from './_components/InterviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'

function InterviewLayout({ children }) {
    const [interviewInfo, setInterviewInfo] = useState(null);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        interviewInfo,
        setInterviewInfo
    }), [interviewInfo]);

  return (
    <InterviewDataContext.Provider value={contextValue}>
        <div>
            <InterviewHeader />
            {children}
        </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout
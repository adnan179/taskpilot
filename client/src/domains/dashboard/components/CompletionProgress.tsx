import { CompletionIcon } from '@/assets/Svgs'
import React from 'react'

const CompletionProgress = ({completionProgress}: {completionProgress: number}) => {
  return (
    <div className='flex justify-between items-center px-10 py-4 rounded-2xl shadow-lg bg-white border border-gray-300'>
      <div className='flex flex-col'>
        <h2 className='text-[20px] font-medium text-gray-400'>Completion Progress</h2>
        <h1 className='text-[30px] font-semibold text-gray-900'>{completionProgress}%</h1>
      </div>
      <CompletionIcon />
      
    </div>
  )
}

export default CompletionProgress

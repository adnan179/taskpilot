import { CompletedIcon } from '@/assets/Svgs'
import React from 'react'

const CompletedTasks = ({completedTasks}: {completedTasks: number}) => {
  return (
    <div className='flex px-10 py-4 rounded-2xl shadow-lg bg-white border border-gray-300 justify-between items-center'>
      <div className='flex flex-col'>
        <h2 className='text-[20px] font-medium text-gray-400'>Completed Tasks</h2>
        <h1 className='text-[30px] font-semibold text-gray-900'>{completedTasks}</h1>
      </div>
      <CompletedIcon />

    </div>
  )
}

export default CompletedTasks

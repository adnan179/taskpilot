import Navbar from '@/components/dashboard/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import AddCategoryForm from '@/components/dashboard/AddCategoryForm';

const Dashboard = () => {
  const { user } = useAuth();
  const [openCategoryForm, setOpenCategoryForm] = useState<boolean>(false);
  const [openTaskForm, setOpenTaskForm] = useState<boolean>(false);
  
    
  return (
    <div className="w-full min-h-screen">
      <Navbar  
        handleOpenCategoryForm={() => {
          console.log("Category form opened")
          setOpenCategoryForm(true)
        }} 
        handleOpenTaskForm={() => setOpenTaskForm(true)}
      />
      <h1>Welcome {user?.username}</h1>
      {openCategoryForm && (
        <div onClick={() => setOpenCategoryForm(false)} className='fixed inset-0 z-50 bg-black/50'>
          <div onClick={(e) => e.stopPropagation()} className='flex w-full min-h-screen justify-center items-center'>
            <AddCategoryForm onClose = {() => setOpenCategoryForm(false)}/>
          </div>
        </div>
      )}
      {openTaskForm && (
        <div onClick={() => setOpenTaskForm(false)} className='flex w-full min-h-screen bg-black/30'>
          <div onClick={(e) => e.stopPropagation()} className='flex w-full min-h-screen justify-center items-center'>
            <AddCategoryForm onClose = {() => setOpenTaskForm(false)}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

import Navbar from '@/components/dashboard/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import AddCategoryForm from '@/components/dashboard/AddCategoryForm';
import AddTaskForm from '@/components/dashboard/AddTaskForm';
import TasksTable from '@/components/dashboard/TasksTable';
import { type Task } from '@/services/Task.services';

const Dashboard = () => {
  const { user } = useAuth();
  const [openCategoryForm, setOpenCategoryForm] = useState<boolean>(false);
  const [openTaskForm, setOpenTaskForm] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  
  const handleOpenNewTaskForm = () => {
    setTaskToEdit(null);
    setOpenTaskForm(true);
  };

  const handleOpenEditTaskForm = (task:Task) => {
    setTaskToEdit(task);
    setOpenTaskForm(true);
  }

  const handleCloseTaskForm = () => {
    setOpenTaskForm(false);
    setTaskToEdit(null);
  }
    
  return (
    <div className="w-full min-h-screen">
      <Navbar  
        handleOpenCategoryForm={() => setOpenCategoryForm(true)} 
        handleOpenTaskForm={handleOpenNewTaskForm}
      />
      <div className='px-16'>
        <h1 className='mt-5 text-3xl text-gray-900 font-semibold'>Welcome {user?.username}</h1>
        <div className='px-4'>
          <TasksTable onEditTask={handleOpenEditTaskForm}/>
        </div>
      </div>
      
      
      {openCategoryForm && (
        <div className='fixed inset-0 z-50 bg-black/50'>
          <div className='flex w-full min-h-screen justify-center items-center'>
            <AddCategoryForm onClose = {() => setOpenCategoryForm(false)}/>
          </div>
        </div>
      )}
      {openTaskForm && (
        <div className='fixed inset-0 z-50 bg-black/50'>
          <div className='flex w-full min-h-screen justify-center items-center'>
            <AddTaskForm onClose = {handleCloseTaskForm} taskToEdit={taskToEdit}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

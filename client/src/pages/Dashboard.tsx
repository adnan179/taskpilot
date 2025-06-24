import Navbar from '@/domains/dashboard/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import AddCategoryForm from '@/domains/dashboard/components/AddCategoryForm';
import AddTaskForm from '@/domains/dashboard/components/AddTaskForm';
import TasksTable from '@/domains/dashboard/components/TasksTable';
import { useGetTasks } from '@/domains/dashboard/services/Task.services';
import { type Task } from "@/domains/dashboard/types/tasks.types";
import TotalTasks from '@/domains/dashboard/components/TotalTasks';
import CompletedTasks from '@/domains/dashboard/components/CompletedTasks';
import CompletionProgress from '@/domains/dashboard/components/CompletionProgress';
import Filters, { type TaskFilters } from '@/domains/dashboard/components/Filters';

const Dashboard = () => {
  const { user } = useAuth();
  const [openCategoryForm, setOpenCategoryForm] = useState<boolean>(false);
  const [openTaskForm, setOpenTaskForm] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [filters,setFilters] = useState<TaskFilters>({
    search:"", 
    status:"",
    priority:"",
    category:"",
    isTableView:true,
  });

  const { data: tasks, isLoading,error} = useGetTasks(user?.username);

  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter(task => task.status === "completed").length || 0;
  const completionProgress = (completedTasks/totalTasks) *100;

  // Apply filters to tasks
const filteredTasks = tasks?.filter(task => {
  const matchesSearch = filters.search
    ? task.name.toLowerCase().includes(filters.search.toLowerCase())
    : true;
  const matchesStatus = filters.status ? task.status === filters.status : true;
  const matchesPriority = filters.priority ? task.priority === filters.priority : true;
  const matchesCategory = filters.category ? task.category === filters.category : true;

  return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
}) || [];
  
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
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-3 mt-5'>
          <TotalTasks totalTasks={totalTasks}/>
          <CompletedTasks completedTasks={completedTasks} />
          <CompletionProgress completionProgress={completionProgress}/>
        </div>
        <Filters 
          filters={filters}
          setFilters={setFilters}
        />
        <div className='px-4'>
          <TasksTable 
            tasks={filteredTasks}
            isLoading={isLoading}
            error={error}
            onEditTask={handleOpenEditTaskForm}
          />
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

import { AddIcon, Logo, LogoutIcon } from '@/assets/Svgs'
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';

interface NavbarProps{
    handleOpenCategoryForm: () => void,
    handleOpenTaskForm: () => void
}

const Navbar = ({ handleOpenCategoryForm, handleOpenTaskForm}: NavbarProps) => {
    const { logout } = useAuth();
    const navigate = useNavigate()
      
    const handleLogout = async () => {
        try{
            await logout();
            navigate({to:"/"})
        }
        catch(error){
            toast.error("Logout failed")
            console.log('Logout failed:', error);
        }
    }
  return (
    <nav className='flex sticky top-0 z-50 justify-between px-10 py-4 bg-white border-b border-gray-300 backdrop-blur-sm'>
        {/* logo */}
        <div className='flex flex-col gap-2'>
            <div className='flex gap-3 items-center'>
                <Logo />
                <h1 className='text-gradient text-[24px] sm:text-[36px] font-bold'>TaskPilot</h1>
            </div>
            <p className='text-[16px] text-gray-400'>Organize your work, simplify your life</p>
        </div>
        
        {/* buttons */}
        <div className='flex gap-3 items-center'>
            <button onClick={handleOpenCategoryForm} className='flex gap-3 items-center px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-200 hover:shadow-md hover:scale-105 ease-in-out duration-300 text-gray-900 font-medium cursor-pointer'>
                <span><AddIcon color='gray'/></span>
                Category
            </button>
            <button onClick={handleOpenTaskForm} className='flex gap-3 items-center px-4 py-2 border border-gray-200 rounded-md bg-[#00002E] hover:bg-gray-800 hover:shadow-md hover:scale-105 ease-in-out duration-300 text-white font-medium cursor-pointer'>
                <span><AddIcon color='white'/></span>
                Add Task
            </button>
            <button onClick={handleLogout} className='flex gap-3 items-center px-4 py-2 border border-gray-200 rounded-md bg-[#00002E] hover:bg-gray-800 hover:shadow-md hover:scale-105 ease-in-out duration-300 text-white font-medium cursor-pointer'>
                <span><LogoutIcon/></span>
                Logout
            </button>
        </div>
        {/* buttons */}
      
    </nav>
  )
}

export default Navbar

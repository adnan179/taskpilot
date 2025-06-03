import { RightArrow } from '@/assets/Svgs';
import { useNavigate } from '@tanstack/react-router';

const Hero = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full h-[calc(75vh-120px)] md:h-[calc(80vh-120px)] flex flex-col gap-8 md:gap-10 justify-center items-center'>
      <h1 className='text-[48px] md:text-[72px] font-bold text-gradient text-center'>Organize your work,<br/> simplify your life</h1>
      <h3 className='text-center text-[24px] md:text-[30px] text-gray-500'>A beautiful, minimalist task manager that helps you stay focused and productive.<br/> Create tasks, organize them by categories, and track your progress.</h3>
        <button className='flex gap-3 items-center bg-[#00002E] text-white font-medium px-4 py-2 text-[24px] rounded-md hover:shadow-md hover:bg-gray-800 hover:scale-105 ease-in duration-300 cursor-pointer'
        onClick={() => navigate({to:"/register"})}
        >
            Start Free Today <span><RightArrow/></span>
        </button>
    </div>
  )
}

export default Hero

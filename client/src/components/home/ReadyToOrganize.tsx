import { useNavigate } from '@tanstack/react-router'

const ReadyToOrganize = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full flex justify-center items-center py-10 md:py-20 mb-20 bg-gradient-to-l from-[#E6E6EA] to-gray-200 border border-gray-300 rounded-2xl'>
        <div className='md:w-[40%] flex flex-col justify-center items-center gap-4'>
            <h1 className='text-[30px] md:text-[48px] font-semibold'>Ready to get organized?</h1>
            <p className='text-[20px] md:text-[24px] text-gray-400 text-center'>Join thousands of users who have transformed their productivity with TaskFlow. Start managing your tasks today</p>
            <div className='flex gap-5 items-center'>
                <button onClick={() => navigate({to:"/register"})}
                    className='text-[20px] md:text-[24px] px-4 py-2 text-white font-medium bg-[#00002E] rounded-lg hover:bg-gray-800 hover:scale-105 ease-in-out duration-300'>Create a free account</button>
                <button onClick={() => navigate({to:"/siginin"})}
                    className='text-[20px] md:text-[24px] px-4 py-2 font-medium rounded-lg border border-gray-500 bg-gray-200 hover:bg-gray-100 hover:scale-105 hover:border-gray-100 ease-in-out duration-300'>Sign In</button>
            </div>
        </div>
    </div>
  )
}

export default ReadyToOrganize;

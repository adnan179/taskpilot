import { useLocation } from '@tanstack/react-router';

const LogoText = () => {
    const location = useLocation();
    
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-[64px] h-[64px] flex items-center justify-center p-5 rounded-[36px] bg-gray-900'>
        <div className='z-50'>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panels-top-left-icon lucide-panels-top-left"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
        </div>
      </div>
      <h1 className='text-[48px] font-bold text-shadow-gray-500'>TaskPilot</h1>
      <p className='text-[16px] text-gray-400'>{location.pathname === '/login' ? 'Welcome back! Please sign in to your account.' : 'Create your account and start organizing your tasks.'}</p>
    </div>
  )
}

export default LogoText;

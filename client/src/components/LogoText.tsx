import { useLocation } from '@tanstack/react-router';
import { Logo } from '../assets/Svgs';

const LogoText = () => {
    const location = useLocation();
    
  return (
    <div className='flex flex-col items-center justify-center'>
      <Logo />
      <h1 className='text-[48px] font-bold text-shadow-gray-500'>TaskPilot</h1>
      <p className='text-[16px] text-gray-400'>{location.pathname === '/signin' ? 'Welcome back! Please sign in to your account.' : 'Create your account and start organizing your tasks.'}</p>
    </div>
  )
}

export default LogoText;

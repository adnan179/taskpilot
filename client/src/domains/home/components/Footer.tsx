import { Logo } from '@/assets/Svgs';

const Footer = () => {
  return (
    <footer className='py-4 px-10 md:px-16 gap-5 bg-white bottom-0 w-full h-[100px] flex md:flex-row flex-col md:items-center md:justify-between border-t border-gray-200'>
        <div className='flex gap-3 items-center'>
            <Logo/>
            <h1 className='text-[24px] font-bold text-gray-800'>TaskPilot</h1>
        </div>
        <p className='text-[16px] text-gray-400'>© 2024 TaskFlow. A beautiful task management experience.</p>
    </footer>
  )
}

export default Footer

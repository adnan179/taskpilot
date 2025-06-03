import { useNavigate } from "@tanstack/react-router"
import { Logo } from "../../assets/Svgs";


const Navbar = () => {
    const navigate = useNavigate();

  return (
    <nav className='h-[100px] flex sticky top-0 z-50 justify-between px-5 md:px-16 py-4 bg-white border-b border-gray-300 backdrop-blur-sm'>
      <div className="flex gap-3 items-center">
        <Logo />
        <h1 className="text-gradient text-[24px] sm:text-[36px] font-bold">TaskPilot</h1>
      </div>
      <div className="flex gap-6 items-center">
        <button onClick={() => navigate({ to:"/signin"})}
            className="text-gray-900 font-medium text-[20px] hover:scale-105 ease-in-out duration-300">
            Sign In
        </button>
        <button onClick={() => navigate({ to:"/register"})}
            className="bg-gray-900 text-white font-medium px-4 py-2 text-[20px] rounded-md shadow hover:scale-105 ease-in-out duration-300">
            Get Started
        </button>
      </div>
    </nav>
  )
}

export default Navbar

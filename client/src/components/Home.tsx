import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try{
      await logout();
      navigate({to:"/"})
    }
    catch(error){
      console.error('Logout failed:', error);
    }
  }
  return (
    <div className="w-full min-h-screen flex flex-col gap-3 justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h1>
      <button 
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded focus:outline-none hover:scale-105 transition-transform ease-in-out"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
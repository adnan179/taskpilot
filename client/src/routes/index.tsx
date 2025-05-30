import { createFileRoute,useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component:RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full min-h-screen">
            <h1 className="text-[36px] font-bold text-purple-500">Welcome to TaskPilot!!</h1>
            <div className="flex gap-5">
                <button onClick={() => navigate({to: '/login'})}
                    className="bg-blue-400 px-4 py-2 text-white font-medium text-[20px] rounded-[16px] hover:scale-105 ease-in-out duration-300">
                    Login
                </button>
                <button onClick={() => navigate({to: '/register'})}
                    className="bg-gray-300 px-4 py-2 font-medium text-[20px] rounded-[16px] hover:scale-105 ease-in-out duration-300">
                    Register
                </button>
            </div>
        </div>
    )
}
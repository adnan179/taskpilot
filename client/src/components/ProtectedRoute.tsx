import { Navigate, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode}){
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && !user){
            navigate({to:'/login'})
        }
    },[user,loading,navigate]);

    if(loading){
        return <div>Loading....</div>
    }
    if(!user){
        return <Navigate to="/login" />
    }
    return <>{children}</>
}
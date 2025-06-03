import { Navigate, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode}){
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate({to:'/signin'})
        }
    },[user,navigate]);

    if(!user){
        return <Navigate to="/signin" />
    }
    return <>{children}</>
}
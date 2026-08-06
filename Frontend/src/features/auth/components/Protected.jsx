import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'
import LoadingState from "../../../components/LoadingState"

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return <LoadingState title="Loading your account..." subtitle="Checking your session and preparing the app." />
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected
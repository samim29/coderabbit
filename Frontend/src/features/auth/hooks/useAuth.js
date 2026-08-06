import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";
import { useNotification } from "../../../components/NotificationProvider";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context
    const { showError } = useNotification()


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            if (!data?.user) {
                throw new Error("Login succeeded but no user details were returned.")
            }
            setUser(data.user)
            return true
        } catch (err) {
            showError(err)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (!data?.user) {
                throw new Error("Registration succeeded but no user details were returned.")
            }
            setUser(data.user)
            return true
        } catch (err) {
            showError(err)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {
            showError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {

                const data = await getMe()
                if (data?.user) {
                    setUser(data.user)
                }
            } catch (err) { } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}

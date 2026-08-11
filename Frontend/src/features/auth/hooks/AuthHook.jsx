import { useContext, useEffect } from "react"
import { AuthContext } from "../authContext"
import { getUser, login, logout, register } from "../services/authApi";

export const useAuth = () => {

    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getUser()
                setUser(data.user)
            }
            catch (err) {
                setUser(null)
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }

        getAndSetUser()
    }, [])

    const handleLogin = async ({ email, password }) => {
        setLoading(true);

        try {
            const data = await login({ email, password })
            setUser(data.user);
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);

        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)

        try {
            const data = await logout()
            setUser(null)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    return { user, loading, handleLogin, handleRegister, handleLogout }
}
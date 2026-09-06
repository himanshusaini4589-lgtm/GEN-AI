import { createContext, useContext, useState, useEffect } from "react"
import api from "../../../lib/axios"

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function fetchUser() {
        try {
            const res = await api.get("/auth/get-me")
            setUser(res.data.user)
        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    async function register(username, email, password) {
        const res = await api.post("/auth/register", { username, email, password })
        setUser(res.data.user)
    }

    async function login(email, password) {
        const res = await api.post("/auth/login", { email, password })
        setUser(res.data.user)
    }

    async function logout() {
        await api.get("/auth/logout")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
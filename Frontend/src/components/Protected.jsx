import { Navigate } from "react-router"
import { useAuth } from "../features/auth/context/AuthContext"

function Protected({ children }) {
    const { user, loading } = useAuth()

    if (loading) return <div className="loading-state">Checking your session...</div>
    if (!user) return <Navigate to="/login" replace />

    return children
}

export default Protected
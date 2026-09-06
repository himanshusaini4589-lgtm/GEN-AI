import { Link, useNavigate } from "react-router"
import { useAuth } from "../features/auth/context/AuthContext"

function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate("/login")
    }

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">Interview AI</Link>
                {user && (
                    <div className="navbar-user">
                        <span>{user.username}</span>
                        <button className="btn-ghost" onClick={handleLogout}>Log out</button>
                    </div>
                )}
            </div>
        </nav>
    )
}
export default Navbar
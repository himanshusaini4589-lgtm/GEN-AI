import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { useAuth } from "../context/AuthContext"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setSubmitting(true)
        try {
            await login(email, password)
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="card">
                <h1>Log in</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="form-error">{error}</p>}
                    <button type="submit" className="btn btn-full" disabled={submitting}>
                        {submitting ? "Logging in..." : "Log in"}
                    </button>
                </form>
            </div>
            <p className="auth-switch">Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    )
}

export default Login
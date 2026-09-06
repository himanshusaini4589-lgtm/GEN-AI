import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { useAuth } from "../context/AuthContext"

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const { register } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setSubmitting(true)
        try {
            await register(username, email, password)
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
                <h1>Create an account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
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
                        {submitting ? "Creating account..." : "Register"}
                    </button>
                </form>
            </div>
            <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
    )
}

export default Register
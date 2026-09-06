import { useState } from "react"
import { useNavigate } from "react-router"
import { useInterview } from "../context/InterviewContext"

function CreateReport() {
    const [resumeFile, setResumeFile] = useState(null)
    const [selfDescription, setSelfDescription] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const { generateReport } = useInterview()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        if (!resumeFile) {
            setError("Add your resume as a PDF to continue")
            return
        }

        const formData = new FormData()
        formData.append("resume", resumeFile)
        formData.append("selfDescription", selfDescription)
        formData.append("jobDescription", jobDescription)

        setSubmitting(true)
        try {
            const report = await generateReport(formData)
            navigate(`/report/${report._id}`)
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <h1>Generate a report</h1>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Resume (PDF)</label>
                        <div className="field-file">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setResumeFile(e.target.files[0])}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label>About you</label>
                        <textarea
                            placeholder="A few sentences on your experience and background"
                            value={selfDescription}
                            onChange={(e) => setSelfDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Job description</label>
                        <textarea
                            placeholder="Paste the full job description"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <button type="submit" className="btn" disabled={submitting}>
                        {submitting ? "Analyzing, this can take a moment..." : "Generate report"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateReport
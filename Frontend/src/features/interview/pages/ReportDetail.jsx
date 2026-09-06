import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import { useInterview } from "../context/InterviewContext"

function ScoreGauge({ score }) {
    const radius = 32
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference

    return (
        <svg width="76" height="76" viewBox="0 0 76 76">
            <circle cx="38" cy="38" r={radius} fill="none" stroke="var(--border)" strokeWidth="8" />
            <circle
                cx="38" cy="38" r={radius} fill="none"
                stroke="var(--primary)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 38 38)"
            />
            <text x="38" y="43" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text)">
                {score}
            </text>
        </svg>
    )
}

function ReportDetail() {
    const { id } = useParams()
    const { getReportById, downloadResumePdf } = useInterview()

    const [report, setReport] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [downloading, setDownloading] = useState(false)

    useEffect(() => {
        async function loadReport() {
            setLoading(true)
            setError("")
            try {
                const data = await getReportById(id)
                setReport(data)
            } catch (err) {
                setError(err.response?.data?.message || "Could not load this report")
            } finally {
                setLoading(false)
            }
        }
        loadReport()
    }, [id])

    async function handleDownloadResume() {
        setDownloading(true)
        try {
            const blob = await downloadResumePdf(id)
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `resume_${id}.pdf`
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
        } catch (err) {
            alert("Could not generate the resume PDF, please try again")
        } finally {
            setDownloading(false)
        }
    }

    if (loading) return <p className="loading-state">Loading report...</p>
    if (error) return <p className="form-error">{error}</p>
    if (!report) return null

    return (
        <div>
            <Link to="/">← Back to reports</Link>
            <h1 style={{ marginTop: "0.75rem" }}>{report.title}</h1>

            <div className="score-gauge-row">
                <ScoreGauge score={report.matchScore} />
                <div className="score-gauge-text">
                    <h3>{report.matchScore}/100 match</h3>
                    <p>Based on your resume and the target job description</p>
                </div>
            </div>

            <div className="report-actions">
                <button className="btn btn-outline" onClick={handleDownloadResume} disabled={downloading}>
                    {downloading ? "Generating tailored resume..." : "Download tailored resume"}
                </button>
            </div>

            <section className="section">
                <h2>Technical questions</h2>
                <div className="card">
                    {report.technicalQuestions.map((q, i) => (
                        <div
                            className="qa-card"
                            key={i}
                            style={i > 0 ? { borderTop: "1px solid var(--border)", paddingTop: "0.9rem" } : {}}
                        >
                            <p><span className="qa-tag">Q</span>{q.question}</p>
                            <p style={{ color: "var(--text-soft)", fontSize: "0.9rem" }}>{q.intention}</p>
                            <p><strong>Answer:</strong> {q.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
                <h2>Behavioral questions</h2>
                <div className="card">
                    {report.behavioralQuestions.map((q, i) => (
                        <div
                            className="qa-card"
                            key={i}
                            style={i > 0 ? { borderTop: "1px solid var(--border)", paddingTop: "0.9rem" } : {}}
                        >
                            <p><span className="qa-tag">Q</span>{q.question}</p>
                            <p style={{ color: "var(--text-soft)", fontSize: "0.9rem" }}>{q.intention}</p>
                            <p><strong>Answer:</strong> {q.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
                <h2>Skill gaps</h2>
                <div className="card">
                    {report.skillGaps.map((s, i) => (
                        <div className="skill-card" key={i}>
                            <span className="skill-name">{s.skill}</span>
                            <span className={`badge ${s.severity}`}>{s.severity}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
                <h2>Preparation plan</h2>
                {report.preparationPlan.map((day) => (
                    <div className="card plan-day" key={day.day}>
                        <h3>Day {day.day} — {day.focus}</h3>
                        <ul>
                            {day.tasks.map((task, i) => <li key={i}>{task}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default ReportDetail
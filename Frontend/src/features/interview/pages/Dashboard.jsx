import { useEffect } from "react"
import { Link } from "react-router"
import { useInterview } from "../context/InterviewContext"

function Dashboard() {
    const { reports, loadingReports, fetchReports } = useInterview()

    useEffect(() => { fetchReports() }, [])

    return (
        <div>
            <div className="page-header">
                <h1>Your reports</h1>
                <Link to="/create" className="btn">+ New report</Link>
            </div>

            {loadingReports && <p className="loading-state">Loading your reports...</p>}

            {!loadingReports && reports.length === 0 && (
                <div className="card empty-state">
                    <p>No reports yet. Upload a resume and a job description to generate your first one.</p>
                </div>
            )}

            {!loadingReports && reports.length > 0 && (
                <div className="report-list">
                    {reports.map((report) => (
                        <Link to={`/report/${report._id}`} key={report._id} className="report-card">
                            <div className="score-badge">
                                {report.matchScore}
                                <span>/100</span>
                            </div>
                            <div className="report-card-main">
                                <h3>{report.title}</h3>
                                <span className="report-card-date">{new Date(report.createdAt).toLocaleDateString()}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
export default Dashboard
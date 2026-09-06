import { createContext, useContext, useState } from "react"
import api from "../../../lib/axios"

const InterviewContext = createContext()

export function InterviewProvider({ children }) {

    const [reports, setReports] = useState([])
    const [loadingReports, setLoadingReports] = useState(false)

    async function fetchReports() {
        setLoadingReports(true)
        try {
            const res = await api.get("/interview")
            setReports(res.data.interviewReports)
        } finally {
            setLoadingReports(false)
        }
    }

    async function getReportById(id) {
        const res = await api.get(`/interview/report/${id}`)
        return res.data.interviewReport
    }

    async function generateReport(formData) {
        const res = await api.post("/interview", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        setReports((prev) => [res.data.interviewReport, ...prev])
        return res.data.interviewReport
    }

    async function downloadResumePdf(id) {
    const res = await api.post(`/interview/resume/pdf/${id}`, null, {
        responseType: "blob"
    })
    return res.data
}

    return (
        <InterviewContext.Provider value={{
            reports,
            loadingReports,
            fetchReports,
            getReportById,
            generateReport,
            downloadResumePdf
        }}>
            {children}
        </InterviewContext.Provider>
    )
}

export function useInterview() {
    return useContext(InterviewContext)
}
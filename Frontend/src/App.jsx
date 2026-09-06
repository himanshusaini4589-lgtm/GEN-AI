import { BrowserRouter, Routes, Route } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./components/Protected"
import Navbar from "./components/Navbar"
import CreateReport from "./features/interview/pages/CreateReport"
import Dashboard from "./features/interview/pages/Dashboard"
import ReportDetail from "./features/interview/pages/ReportDetail"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Protected><Dashboard /></Protected>} />
          <Route path="/create" element={<Protected><CreateReport /></Protected>} />
          <Route path="/report/:id" element={<Protected><ReportDetail /></Protected>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
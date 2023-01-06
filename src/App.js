import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <BrowserRouter>
        <Routes path="/">
          <Route index element={user?._id ? <Dashboard /> : <Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

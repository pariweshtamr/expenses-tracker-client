import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Layout from "../components/layout/Layout"
import { loginUser } from "../utils/axiosHelper"

const initialState = {
  email: "",
  pin: "",
}

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [response, setResponse] = useState({})

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data } = await loginUser(formData)
    setResponse(data)

    if (data?.status === "success") {
      navigate("/dashboard")
      sessionStorage.setItem("user", JSON.stringify(data.result))
    }
  }
  return (
    <Layout>
      {response?.status === "success"
        ? toast.success(response?.message, { toastId: "success" })
        : toast.error(response?.message, { toastId: "error" })}
      <Form className="form-area" onSubmit={handleSubmit}>
        <h2 className="text-center">Welcome Back! Login</h2>
        <hr />

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Pin</Form.Label>
          <Form.Control
            type="number"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>

        <div className="text-center">
          Don't have an account? <Link to="/register"> Register Now </Link>
        </div>
      </Form>
    </Layout>
  )
}

export default Login

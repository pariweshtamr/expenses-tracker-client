import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Layout from "../components/layout/Layout"
import { addUser } from "../utils/axiosHelper"
import { useDispatch, useSelector } from "react-redux"
import { registerAction } from "../redux/auth/auth.action"

const initialState = {
  name: "",
  email: "",
  pin: "",
}

const Register = () => {
  const dispatch = useDispatch()
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
    // const { data } = await addUser(formData)
    // setResponse(data)
    dispatch(registerAction(formData))
    setFormData(initialState)
  }

  return (
    <Layout>
      {/* {response?.status === "success"
        ? toast.success(response?.message, { toastId: "success" })
        : toast.error(response?.message, { toastId: "error" })} */}
      <Form className="form-area" onSubmit={handleSubmit}>
        <h2 className="text-center">Register</h2>
        <hr />

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="xyz@email.com"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Pin</Form.Label>
          <Form.Control
            type="number"
            name="pin"
            placeholder="1234"
            value={formData.pin}
            onChange={handleChange}
            min="1000"
            max="9999"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>

        <div className="text-center">
          Already have an account? <Link to="/login">Login Now</Link>
        </div>
      </Form>
    </Layout>
  )
}

export default Register

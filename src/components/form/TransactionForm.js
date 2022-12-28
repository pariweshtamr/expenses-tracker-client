import { useState } from "react"
import { postTransaction } from "../../utils/axiosHelper"
import { toast } from "react-toastify"
import { Button, Col, Form, Row } from "react-bootstrap"

const initialState = {
  type: "",
  name: "",
  amount: "",
}
const TransactionForm = ({ getTransactions }) => {
  const [formData, setFormData] = useState(initialState)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const { status, message } = await postTransaction(formData)

    toast[status](message)

    status === "success" && getTransactions()
  }
  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="mt-3 gap-2">
          <Col md={2}>
            <Form.Select
              name="type"
              required
              onChange={handleOnChange}
              value={formData.type}
            >
              <option>Choose...</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Form.Select>
          </Col>
          <Col md="5">
            <Form.Control
              onChange={handleOnChange}
              name="name"
              placeholder="Transaction Name"
              required
              value={formData.name}
            />
          </Col>
          <Col md="2">
            <Form.Control
              onChange={handleOnChange}
              name="amount"
              type="number"
              placeholder="amount i.e. 500"
              required
              value={formData.amount}
            />
          </Col>
          <Col md="2">
            <div className="d-grid">
              <Button type="submit"> Add </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default TransactionForm

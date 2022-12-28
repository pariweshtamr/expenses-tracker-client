import { useState } from "react"
import { Button, Form, Table } from "react-bootstrap"
import { deleteTransactions } from "../../utils/axiosHelper"

const TransactionTable = ({ transactions, getTransactions }) => {
  const [itemToDelete, setItemToDelete] = useState([])
  const [isAllSelected, setIsAllSelected] = useState(false)

  const handleOnSelect = (e) => {
    const { checked, value } = e.target

    if (checked) {
      setItemToDelete([...itemToDelete, value])
      setIsAllSelected(transactions.length === itemToDelete.length + 1)
    } else {
      setItemToDelete(itemToDelete.filter((_id) => _id !== value))
      setIsAllSelected(false)
    }
  }

  console.log(transactions)
  const handleOnAllSelect = (e) => {
    const checked = e.target.checked

    if (checked) {
      setItemToDelete(transactions.map(({ _id }) => _id))
      setIsAllSelected(true)
    } else {
      setItemToDelete([])
      setIsAllSelected(false)
    }
  }

  const total = transactions.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + amount : acc - amount,
    0
  )

  const handleOnDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${itemToDelete.length} transactions?`
      )
    ) {
      const { status } = await deleteTransactions(itemToDelete)
      if (status === "success") {
        setItemToDelete([])
        setIsAllSelected(false)
        getTransactions()
      }
    }
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={handleOnAllSelect}
                checked={isAllSelected}
              />
            </th>
            <th>Date / Time</th>
            <th>Transaction</th>
            <th>Income</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  onChange={handleOnSelect}
                  value={item._id}
                  checked={itemToDelete.includes(item._id)}
                />
              </td>
              <td>{new Date(item.createdAt).toLocaleString()} </td>

              <td>{item.name}</td>
              {item.type === "income" ? (
                <>
                  <td className="text-success">${item.amount}</td>
                  <td></td>
                </>
              ) : (
                <>
                  <td></td>
                  <td className="text-danger">- ${item.amount}</td>
                </>
              )}
            </tr>
          ))}

          <tr className="fw-bolder fs-5">
            <td colSpan={3} className="text-center">
              Total balance
            </td>
            <td
              colSpan={2}
              className={`${
                total > 0 ? "text-success" : "text-danger"
              } text-center`}
            >
              ${total}
            </td>
          </tr>
        </tbody>
      </Table>
      {itemToDelete.length ? (
        <div className="d-grid">
          <Button variant="danger" onClick={handleOnDelete}>
            Delete {itemToDelete.length} item(s)
          </Button>
        </div>
      ) : null}
    </>
  )
}

export default TransactionTable

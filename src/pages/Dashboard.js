import React, { useEffect, useState } from "react"
import TransactionForm from "../components/form/TransactionForm"
import Layout from "../components/layout/Layout"
import TransactionTable from "../components/table/TransactionTable"
import { getTransactions } from "../utils/axiosHelper"

const Dashboard = () => {
  const [trans, setTrans] = useState([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const { transactions } = (await getTransactions()) || []
    setTrans(transactions)
  }
  return (
    <Layout>
      <div className="form">
        <TransactionForm getTransactions={fetchTransactions} />
      </div>
      <div className="my-4 text-light">
        {trans.length} transaction(s) found!
      </div>
      <TransactionTable
        transactions={trans}
        getTransactions={fetchTransactions}
      />
    </Layout>
  )
}

export default Dashboard

import axios from "axios"

const rootUrl =
  process.env.NODE_ENV === "production"
    ? "/api/v1"
    : process.env.REACT_APP_ROOT_URL

const userUrl = rootUrl + "/user"
const transactionUrl = rootUrl + "/transaction"

const getUserIdFromStorage = () => {
  const user = JSON.parse(sessionStorage.getItem("user"))
  if (user) {
    return user?._id
  }
  return
}

// User section
// Send data to server to add to db
export const addUser = async (formData) => {
  try {
    return await axios.post(userUrl, formData)
  } catch (error) {
    console.log(error)
    return {
      status: "error",
      message: error.message,
    }
  }
}

// LOGIN USER
export const loginUser = async (formData) => {
  try {
    return await axios.post(`${userUrl}/login`, formData)
  } catch (error) {
    console.log(error)
    return {
      status: "error",
      message: error.message,
    }
  }
}

// Transaction Section
// Post transaction
export const postTransaction = async (formData) => {
  try {
    const userId = getUserIdFromStorage()

    if (!userId) {
      return {
        status: "error",
        message: "Please login first",
      }
    }

    const { data } = await axios.post(transactionUrl, formData, {
      headers: {
        Authorization: userId,
      },
    })

    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

//get user specific transactions
export const getTransactions = async () => {
  try {
    const userId = getUserIdFromStorage()
    if (!userId) {
      return {
        status: "error",
        message: "Please login first",
      }
    }

    const { data } = await axios.get(transactionUrl, {
      headers: {
        Authorization: userId,
      },
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// delete transactions
export const deleteTransactions = async (ids) => {
  try {
    const userId = getUserIdFromStorage()
    if (!userId) {
      return {
        status: "error",
        message: "Please login first",
      }
    }
    const { data } = await axios.delete(transactionUrl, {
      data: ids,
      headers: {
        Authorization: userId,
      },
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

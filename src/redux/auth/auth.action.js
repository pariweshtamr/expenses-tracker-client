import { toast } from "react-toastify"
import { addUser, loginUser } from "../../utils/axiosHelper"
import {
  loginSuccess,
  registerSuccess,
  requestFail,
  requestPending,
} from "./auth.slice"

export const registerAction = (form) => async (dispatch) => {
  // set loader
  dispatch(requestPending())

  // call axios
  const result = addUser(form)
  toast.promise(result, {
    pending: "Please wait...",
  })

  const { data } = await result

  dispatch(registerSuccess(data))
  toast[data.status](data.message)
}

export const loginAction = (form) => async (dispatch) => {
  try {
    // set loader
    dispatch(requestPending())

    // call axios

    const { data } = await loginUser(form)

    data.status === "success"
      ? dispatch(loginSuccess(data)) &&
        toast[data.status](data.message, { toastId: data.status })
      : dispatch(requestFail(data.message)) &&
        toast[data.status](data.message, { toastId: data.status })
  } catch (error) {
    dispatch(requestFail(error))
  }
}

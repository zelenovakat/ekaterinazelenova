import { Dispatch, SetStateAction, useState } from "react"

const defaultState = {
  name: "",
  email: "",
  mobile: "",
  message: "",
  loading: false,
  success: false,
}

interface submitFormParams {
  data: Partial<typeof defaultState>
  setState: Dispatch<SetStateAction<typeof defaultState>>
}

const submitForm = async (params: submitFormParams) => {
  const { data, setState } = params

  setState((prevState) => ({ ...prevState, loading: true, success: false }))

  const response = await fetch("api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const body = await response.json()

  if (!response.ok) {
    setState((prevState) => ({
      ...prevState,
      loading: false,
      success: false,
    }))

    const { errors } = body
    throw new Error(errors[0])
  }
  setState((prevState) => ({
    ...prevState,
    loading: false,
    success: true,
  }))

  return true
}

function useContactForm() {
  const [state, setState] = useState(defaultState)
  const { name, email, mobile, message } = state
  return {
    callbacks: {
      setState: (params: Partial<typeof defaultState>) =>
        setState((prevState) => {
          const newState = { ...prevState, ...params }
          return newState
        }),
      submitForm: (e: { preventDefault: () => void }) => {
        e.preventDefault()
        submitForm({ data: { email, message, mobile, name }, setState })
      },
    },
    state,
  }
}

export default useContactForm

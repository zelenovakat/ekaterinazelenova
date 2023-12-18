import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from "next/router"

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
  onError: (errorMessage: string) => void
}

const submitForm = async (params: submitFormParams) => {
  const { data, setState, onError } = params

  setState((prevState) => ({ ...prevState, loading: true, success: false }))

  try {
    const response = await fetch("api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const body = await response.json()

    if (!response.ok) {
      const { errors } = body
      setState((prevState) => ({
        ...prevState,
        loading: false,
        success: false,
      }))
      throw new Error(errors[0])
    }

    setState((prevState) => ({
      ...prevState,
      loading: false,
      success: true,
    }))

    return true
  } catch (error: any) {
    console.error("Error submitting form:", error)
    onError(error.message || "An error occurred while submitting the form.")
  }
}

function useContactForm() {
  const [state, setState] = useState(defaultState)
  const { name, email, mobile, message } = state
  const router = useRouter()

  const resetForm = () => {
    router.push({
      pathname: "/success",
    })
    setState((prevState) => ({
      ...defaultState,
      success: prevState.success, // save the success state
    }))
  }

  const handleApiError = (errorMessage: string) => {
    console.error("API Error:", errorMessage)
    // Redirect to error page using router
    router.push({
      pathname: "/error",
      query: { errorMessage: errorMessage },
    })
  }

  return {
    callbacks: {
      setState: (params: Partial<typeof defaultState>) =>
        setState((prevState) => ({ ...prevState, ...params })),
      submitForm: async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        await submitForm({
          data: { email, message, mobile, name },
          onError: handleApiError,
          setState,
        })
        resetForm()
      },
    },
    state,
  }
}

export default useContactForm

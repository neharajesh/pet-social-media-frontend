import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { signupUser } from "./authSlice"

export const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [retypePassword, setRetypePassword] = useState("")
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const submitButtonHandler = async() => {
        const response = await dispatch(signupUser({username: username, password: password}))
        response.payload.message === "User signed up" ? toast.success("Registered Successfully") : toast.error(response.payload.message)
    }

    return (<>
        <div className="authPageContainer">
            <Toaster />
            <img className="authImage" src="https://freesvg.org/img/Dog-Breeds-Icons.png" alt="pets" />
            <div className="authContainer">
                <h1> Register </h1>
                <div className="inputContainer">
                    <p> Username </p>
                    <input className="inputBox" type="text" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="inputContainer">
                    <p> Password </p>
                    <input className="inputBox" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="inputContainer">
                    <p> Retype Password </p>
                    <input className="inputBox" type="password" onChange={(e) => setRetypePassword(e.target.value)} />
                </div>
                <button className="submitButton" onClick={submitButtonHandler} disabled={!(password === retypePassword)}> Submit </button>

                <p> Already have an account? </p> <Link to="/signin" className="navLink"> Click here to Login </Link>
            </div>
        </div>
    </>)
}
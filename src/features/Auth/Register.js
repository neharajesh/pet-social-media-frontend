import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { signupUser } from "./authSlice"

export const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [retypePassword, setRetypePassword] = useState("")
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const submitButtonHandler = async() => {
        await dispatch(signupUser({username: username, password: password}))
        auth.error === "" ? toast.error(auth.message) : toast.success(auth.message)
    }

    return (<>
        <div className="authPageContainer">
            <Toaster />
            <img className="authImage" src="https://freesvg.org/img/Dog-Breeds-Icons.png" alt="pet image" />
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
            </div>
        </div>
    </>)
}
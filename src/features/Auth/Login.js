import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { signinUser, signupUser } from "./authSlice"
import { generateRandomUsername } from "./Utils"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitButtonHandler = async() => {  
        const response = await dispatch(signinUser({username: username, password: password}))
        response.token === "" ? toast.error("Could not sign in") : toast.success("Signed in successfully")
    }

    const loginAsGuestHandler = async() => {
        const username = generateRandomUsername()
        console.log(username)
        toast(`Logging in with username ${username}. 
               Username cannot be changed. 
               Password can be changed from your profile.`)
        const registerResponse = await dispatch(signupUser({username: username, password: username}))
        console.log(registerResponse)
        const response = await dispatch(signinUser({username: username, password: username}))
        console.log(response)
        response.token === "" ? toast.error("Could not sign in") : toast.success("Signed in successfully")
    }
    
    useEffect(() => {        
        auth.token !== "" && navigate("/")
        // eslint-disable-next-line
    }, [auth])
    
    return(<>
        <div className="authPageContainer">
            <Toaster />
            <img className="authImage" src="https://freesvg.org/img/Dog-Breeds-Icons.png" alt="pets" />
            <div className="authContainer">
                <h1> Login </h1>
                <div className="inputContainer">
                    <p> Username </p> 
                    <input className="inputBox" type="text" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="inputContainer">
                    <p> Password </p> 
                    <input className="inputBox" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="submitButton" onClick={submitButtonHandler}> Submit </button>

                <button onClick={() => loginAsGuestHandler()}> Login as Guest </button> 

                <Link className="navLink" to="/signup"> Click here to Register </Link>
            </div>
        </div>
    </>)
}
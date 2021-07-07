import { useState } from "react"
import { Link } from "react-router-dom"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submitButtonHandler = () => {
        //loginRequest(username, password);
        console.log("username =", username)
        console.log("password =", password)
    }    
    
    return(<>
        <h1>Login Page</h1>
        <label>Username <input type="text" onChange={(e) => setUsername(e.target.value)} /> </label>
        <label>Password <input type="password" onChange={(e) => setPassword(e.target.value)} /> </label>
        <button onClick={submitButtonHandler}> Submit </button>
        <p>Username : {username}</p>
        <p>Password : {password}</p>
        <Link className="navLink" to="/signup"> Register </Link>
    </>)
}
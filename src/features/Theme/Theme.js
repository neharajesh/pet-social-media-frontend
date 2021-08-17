import { useDispatch } from "react-redux"
import { changeToDark, changeToLight } from "./themeSlice";
import "./theme.css"
import { useEffect, useState } from "react";

export const Theme = () => {
    const dispatch = useDispatch();
    const [dark, setDark] = useState(true)

    const themeHandler = () => {
        dark ? dispatch(changeToLight()) : dispatch(changeToDark())
    }

    // eslint-disable-next-line
    useEffect(() => themeHandler(), [dark])

    return (<>
        <div className="w-10">🌞  {" "}
            <label class="switch"> 
                <input type="checkbox" onChange={() => {                    
                    setDark(dark => !dark)
                }} />
                <span class="slider round"></span>
            </label>🌚
        </div>
    </>)
}
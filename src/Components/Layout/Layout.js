import { useSelector } from "react-redux"
import { Topbar } from "./Topbar"

export const Layout = ({children}) => {
    const { theme } = useSelector(state => state.theme)
    const { auth } = useSelector(state => state.auth)

    return (<>
        <div className="appContainer">
            <Topbar />
            <div className={theme==="dark" ? "pageContainer darkTheme" : "pageContainer lightTheme"}> {children} </div>                      
        </div>
    </>)
}
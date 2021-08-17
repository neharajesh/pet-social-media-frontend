import { useSelector } from "react-redux"
import { Topbar } from "./Topbar"

export const Layout = ({children}) => {
    const { theme } = useSelector(state => state.theme)

    return (<>
        <div className="appContainer">
            <Topbar />
            <div className={theme==="dark" ? "pageContainer darkTheme" : "pageContainer lightTheme"}> {children} </div>                      
        </div>
    </>)
}
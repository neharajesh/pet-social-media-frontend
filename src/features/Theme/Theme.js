import { useDispatch } from "react-redux"
import { changeToDark, changeToLight } from "./themeSlice";

export const Theme = () => {
    const dispatch = useDispatch();

    return (<>
        <div>
            <button className="pd-05" onClick={() => dispatch(changeToLight())}> Light Theme </button>
            <button className="pd-05" onClick={() => dispatch(changeToDark())}> Dark Theme </button>
        </div>
    </>)
}
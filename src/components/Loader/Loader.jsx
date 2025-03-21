import { RiLoader5Line } from "react-icons/ri";
import "./Loader.css"

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <RiLoader5Line className="loader" size={64} />
        </div>
    )
}

export default Loader;
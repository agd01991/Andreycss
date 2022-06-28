import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAuthToken} from "../auth/authSlice";
import styles from './Aside.module.css';
import vector from './Vector.png';
import vector1 from './Vector1.png';
import vector2 from './Vector2.png';
// import { useHistory } from "react-router-dom";

export function Aside() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onExit = () => {
        localStorage.setItem("token", "");
        dispatch(setAuthToken(""))
        navigate("/login", { replace: true });
    }

    return (
        <>
            <nav className={styles.line}>
                <ul >
                    <li className={styles.acc}>
                        <NavLink to="profile">
                            <img src={vector} />
                        </NavLink>
                    </li>
                    <li className={styles.comp}>
                        <NavLink to="companies">
                            <img src={vector1} />
                        </NavLink>
                    </li>
                    <li className={styles.exit}>
                        <button onClick={onExit} >
                            <img src={vector2} />
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
}
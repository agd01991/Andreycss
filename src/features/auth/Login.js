import {useForm} from "react-hook-form";
import styles from './Auth.module.css';
import {useDispatch} from "react-redux";
import {loginThunk} from "./authSlice";
import {useNavigate} from "react-router-dom";
import lock from './lock.png';
import log from './Vectorlog.png';
import bottom from './VectorBottom1.png';
import bottom2 from './VectorBottom2.png';

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        dispatch(loginThunk(data))
        navigate("/", { replace: true });
    }

    return (
        <>
            <div className={styles.card}>
                <p className={styles.title}>BRUNO</p>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <input className={styles.email} type="email" {...register("email", { required: true })}
                           placeholder={"Your Email"} />   
                    {errors.email && <span style={{ color: "red" }}>*Email* is mandatory </span>}
                    <input className={styles.password} type="password" {...register("password",{ required: true })}
                           placeholder={"Your password"} />
                    <input className={styles.button} type={"submit"} />
                </form>
                <img src={log} className={styles.log}/>
                <img src={lock} className={styles.lock}/>
            </div>
            <img src={bottom2} className={styles.bottom2}/>
            <img src={bottom} className={styles.bottom}/>
            
        </>
    );
}
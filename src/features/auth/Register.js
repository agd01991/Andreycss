import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {registerThunk} from "./authSlice";
import {useNavigate} from "react-router-dom";
import styles from './Auth.module.css';
import lock from './lock.png';
import log from './Vectorlog.png';
import bottom from './VectorBottom1.png';
import bottom2 from './VectorBottom2.png';

export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        dispatch(registerThunk(data))
        navigate("/", {replace: true});
    }

    return (
        <>
            <p className={styles.title}>Register Form</p>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.email} type="email" {...register("email", {required: true})} placeholder={"Your Email"}/>
                {errors.email && <span style={{color: "red"}}>*Email* is mandatory </span>}
                <input className={styles.password} type="password" {...register("password", {required: true})} placeholder={"Your password"}/>
                <input className={styles.button} type={"submit"} />
                <img src={log} className={styles.log}/>
                <img src={lock} className={styles.lock}/>
            </form>
            <img src={bottom2} className={styles.bottom2}/>
            <img src={bottom} className={styles.bottom}/>
        </>
    );
}
import {useDidMount} from "react-hooks-lib";
import {useDispatch, useSelector} from "react-redux";
import {getUserThunk, selectUser, updateUserDataThunk} from "./profileSlice";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {addClientThunk} from "../companies/clientsSlice";
import styles from './Profile.module.css';
import pen from './Vectorpen.png';
import line2 from './line2.png';  

export function Profile() {
    const dispatch = useDispatch()
    const [showEditModal, setShowEditModal] = useState(false)
    const [showClientModal, setShowClientModal] = useState(false)

    const {register, handleSubmit, formState: { errors } } = useForm();


    useDidMount(() => {
        dispatch(getUserThunk())
    })

    const user = useSelector(selectUser);

    const onShowEditModal = () => {
        setShowEditModal(true)
    }

    const onShowClientModal = () => {
        setShowClientModal(true)
    }

    const onCloseEditModal = () => {
        setShowEditModal(false)
    }


    const onCloseClientModal = () => {
        setShowClientModal(false)
    }

    const onSubmitEdit = async (data) => {
        dispatch(updateUserDataThunk(data))
        setShowEditModal(false)
    }

    const onSubmitClient = async (data) => {
        dispatch(addClientThunk(data))
        setShowEditModal(false)
    }

    return (
        <>
            <img src={line2}/>   
            <h1 className={styles.logo}>BRUNO</h1>                  
            <h2 className={styles.profile}>Профиль</h2>
            <div>{user.email}</div>
            <div>{user.userData.name}</div>
            <div>{user.userData.phone}</div>
            <button className={styles.change} onClick={onShowEditModal}><img src={pen} /></button>
            <button className={styles.addClient} onClick={onShowClientModal}>Добавить клиента</button>
            {
                showEditModal &&
                <div>
                    
                    <button className={styles.close} onClick={onCloseEditModal}>Закрыть окно</button>
                    <form className="App" onSubmit={handleSubmit(onSubmitEdit)}>
                        <input className={styles.name} type="text" {...register("name", { required: true })}
                               placeholder={"Имя"} />
                        <input className={styles.lastName} type="text" {...register("lastName", { required: true })}
                               placeholder={"Фамилия"} />
                        <input className={styles.email} type="email" {...register("email", {required: true})} 
                                placeholder={"Your Email"}/>
                        <input className={styles.telephone} type="tel" {...register("phone", { required: true })}
                               placeholder={"Телефон"} />
                        <input className={styles.re} type={"submit"} value={"Обновить"} />
                    </form>
                </div>
            }
            {
                showClientModal &&
                <div>
                    <p className={styles.title}>BRUNO</p>
                    <button className={styles.close2} onClick={onCloseClientModal}>Закрыть окно</button>
                    <form className="App" onSubmit={handleSubmit(onSubmitClient)}>
                        <input className={styles.compName} type="text" {...register("company", { required: true })}
                               placeholder={"Наименование организации"} />
                        <input className={styles.email2} type="email" {...register("email", { required: true })}
                               placeholder={"Email"} />
                        <input className={styles.telephone2} type="tel" {...register("phone", { required: true })}
                               placeholder={"+7(999)999-99-99"} />

                        <input className={styles.addComp} type={"submit"} value={"Добавить компанию"} />
                    </form>
                </div>
            }
        </>
    );
}
import {useDidMount} from "react-hooks-lib";
import {
    getClientBankDetailsThunk,
    getClientThunk,
    selectCurrentClient,
    selectCurrentClientBankDetails, updateClientThunk
} from "./clientsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {useForm} from "react-hook-form";
import styles from './Company.module.css';

export function Company() {
    const dispatch = useDispatch()
    const {id} = useParams();
    const {register, handleSubmit, formState: { errors } } = useForm();

    useDidMount(() => {
        dispatch(getClientThunk(id))
        dispatch(getClientBankDetailsThunk(id))
    })

    const onSubmit = async (data) => {
        dispatch(updateClientThunk(data, id))
    }

    const client = useSelector(selectCurrentClient);
    const clientBankDetails = useSelector(selectCurrentClientBankDetails);

    return (
        <>
            <h1>Компания {client.company}</h1>
            <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.bankName} type="text" {...register("bank", { required: true })}
                       placeholder={"Название банка"}/>
                <input className={styles.corrAcc} type="text" {...register("corrAccount", { required: true })}
                       placeholder={"Корр счет"}/>
                <input className={styles.BIK} type="text" {...register("bankCode", { required: true })}
                       placeholder={"БИК"}/>
                <input className={styles.Poluch} type="text" {...register("recipient", { required: true })}
                       placeholder={"Получатель"}/>
                <input className={styles.inn} type="text" {...register("taxpayerNumber", { required: true })}
                       placeholder={"ИНН"}/>
                <input className={styles.kpp} type="text" {...register("statementCode", { required: true })}
                       placeholder={"КПП"}/>
                <input className={styles.accNum} type="text" {...register("recipientAccount", { required: true })}
                       placeholder={"Номер Счёта"}/>
                <input className={styles.update} type={"submit"} style={{ backgroundColor: "#a1eafb" }} value={"Обновить реквизиты"} />
            </form>
        </>
    );
}
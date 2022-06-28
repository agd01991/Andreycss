import {useDidMount} from "react-hooks-lib";
import {addClientThunk, getClientsThunk, selectClients} from "./clientsSlice";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import styles from './Company.module.css';

export function Companies() {
    const dispatch = useDispatch()
    useDidMount(() => {
        dispatch(getClientsThunk())
    })

    const clients = useSelector(selectClients);
    return (
        <>
            <div className={styles.noCompany} >
            <h1>Компании</h1>
            <ul>
                {clients.length > 0 ? clients.map(item => <li key={item.id}><NavLink to={item.id} key={item.id}>{item.company}</NavLink></li>) : <span>У вас нет компаний</span>}
            </ul>
            </div>
        </>
    );
}
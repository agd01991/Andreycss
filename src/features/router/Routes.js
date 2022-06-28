import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import {Login} from "../auth/Login";
import {Register} from "../auth/Register";
import {Aside} from "../aside/Aside";
import {Top} from "../top/Top";
import {Companies} from "../companies/Companies";
import {WrongRoute} from "../wrongRoute/WrongRoute";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthToken, setAuthToken} from "../auth/authSlice";
import {Company} from "../companies/Company";
import {Profile} from "../profile/Profile";

export function Router() {
    const dispatch = useDispatch();
    let token = useSelector(selectAuthToken);
    if (!token) {
        let storageToken = localStorage.getItem("token");
        dispatch(setAuthToken(storageToken))
    }
    token = useSelector(selectAuthToken);

    return (
        <>
            <BrowserRouter>
                {!token ?
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                    :
                    <div>
                        <Aside/>
                        <Top/>
                        <Routes>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/companies" element={<Companies/>}/>
                            <Route path="/companies/:id" element={<Company/>}/>
                            <Route path="/*" element={<WrongRoute/>}/>
                        </Routes>
                    </div>

                }
            </BrowserRouter>
        </>

    )
}
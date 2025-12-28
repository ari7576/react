import React from "react";
import {useDispatch} from "react-redux";
import {login} from "../redux/user";
import {logout} from "../redux/user";

function Login() {
    const dispatch = useDispatch()
    return(
        <div>
            <button onClick = {() => {
                dispatch(login({name: '내이름', age: 20, email: 'email@gmail.com'}))
            }}>login</button>
            <h1></h1>
            <button onClick = {() => {
                dispatch(logout())}}>logout</button>
        </div>
    )
}

export default Login
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {checkAuth, loginRequest, logoutRequest, registrationRequest} from "./store/reducers/userSlice";
import api from "./http/API";

const App = () => {
    const [email, setEmail] = useState('qwerty@gmail.com')
    const [password, setPassword] = useState('123')
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

    const handleLogin = () => {
        if (email && password) {
            dispatch(loginRequest({email, password}))
        }
    }

    const handleRegistration = () => {
        if (email && password) {
            dispatch(registrationRequest({email, password}))
        }
    }


    const handleLogout = () => {
        dispatch(logoutRequest())
    }

    const getUsers = async () => {
        try {
            const response = await api.get('/users')
            setUsers(response.data)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div>
            <input
                placeholder={'E-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
            />
            <input
                placeholder={'Password'}
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="text"
            />
            {!user.isAuth && <button onClick={handleLogin}>Log in</button>}
            {!user.isAuth && <button onClick={handleRegistration}>Register</button>}
            {
                user.isAuth ? (
                    <div>
                        <h2>Вы вошли как {user.info.email}</h2>
                        <button onClick={handleLogout}>Log out</button>
                        <button onClick={getUsers}>Get users</button>
                        <div>
                            {
                                users.map(user => (
                                    <div>
                                        {user.email}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : null
            }

        </div>
    );
};

export default App;
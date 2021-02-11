import React, {useState} from 'react';
import {authService} from 'myFirebase';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newAccount) {
                await authService.createUserWithEmailAndPassword(email, password);
            } else {
                await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = (prev) => {
        setNewAccount(!prev);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" value={email} onChange={onChange} type="text" placeholder="Email" required/>
                <input name="password" value={password} onChange={onChange} type="password" placeholder="Password"
                       required/>
                <input type="submit" value={newAccount ? "회원가입" : "로그인"}/>
                {error}
            </form>
            <span onClick={toggleAccount} value={newAccount ? "회원가입 하기" : "로그인 하기"}/>
        </div>
    );
}

export default AuthForm;
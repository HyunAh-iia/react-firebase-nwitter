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
            <form onSubmit={onSubmit} className="container">
                <input name="email"
                       value={email}
                       onChange={onChange}
                       type="text"
                       placeholder="Email"
                       required
                       className="authInput"/>
                <input name="password"
                       value={password}
                       onChange={onChange}
                       type="password"
                       placeholder="Password"
                       required
                       className="authInput"/>
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount}  className="authSwitch">
                {newAccount ? "회원가입 하기" : "로그인 하기"}
            </span>
        </div>
    );
}

export default AuthForm;
import React, {useState} from 'react';
import {authService, firebaseInstance} from 'myFirebase';

const Auth = () => {
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
    }

    const toggleAccount = (prev) => {
        setNewAccount(!prev);
    }

    const onSocialClick = async (e) => {
        const {target: {name}} = e;
        let provider;

        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        console.log(data);
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
            <div>
                <button name="google" onClick={onSocialClick}>구글아이디로 로그인</button>
                <button name="github" onClick={onSocialClick}>깃헙아이디로 로그인</button>
            </div>
        </div>
    );
}

export default Auth;
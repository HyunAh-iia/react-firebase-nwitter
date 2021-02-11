import React from 'react';
import {authService, firebaseInstance} from 'myFirebase';
import AuthForm from "components/AuthForm";

const Auth = () => {
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
            <AuthForm/>
            <div>
                <button name="google" onClick={onSocialClick}>구글아이디로 로그인</button>
                <button name="github" onClick={onSocialClick}>깃헙아이디로 로그인</button>
            </div>
        </div>
    );
}

export default Auth;
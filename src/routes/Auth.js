import React from 'react';
import {authService, firebaseInstance} from 'myFirebase';
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter, faGoogle, faGithub,} from "@fortawesome/free-brands-svg-icons";

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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm/>
            <div className="authBtns">
                <button name="google" onClick={onSocialClick} className="authBtn">
                    구글아이디로 로그인 <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button name="github" onClick={onSocialClick} className="authBtn">
                    깃헙아이디로 로그인 <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
}

export default Auth;
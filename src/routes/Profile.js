import React, { useEffect} from 'react';
import {authService, dbService} from "../myFirebase";
import {useHistory} from "react-router-dom";

const Profile = ({userObj}) => {
    const history = useHistory();
    const onLogout = () => {
        authService.signOut();
        history.push("/");
    };

    return (
        <>
            <button onClick={onLogout}>로그아웃</button>
            <span>Profile</span>
        </>
    );
};


export default Profile;
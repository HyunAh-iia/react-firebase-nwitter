import React from 'react';
import {authService} from "../myFirebase";

const Profile = () => {
    const onLogout = () => authService.signOut();

    return (
        <>
            <button onClick={onLogout}>로그아웃</button>
            <span>Profile</span>
        </>
    );
};


export default Profile;
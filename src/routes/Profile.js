import React, {useState} from 'react';
import {authService} from "../myFirebase";
import {useHistory} from "react-router-dom";

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newName, setNewName] = useState(userObj.displayName);
    const onLogout = () => {
        authService.signOut();
        history.push("/");
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newName) {
            await userObj.updateProfile({
                displayName: newName,
            });
            refreshUser();
        }
    };

    const onChange = (e) => {
        const {target: {value}} = e;
        setNewName(value);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="Display Name"/>
                <input type="submit" value="저장"/>
            </form>
            <button onClick={onLogout}>로그아웃</button>
        </>
    );
};


export default Profile;
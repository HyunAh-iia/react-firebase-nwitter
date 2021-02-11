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
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text"
                       onChange={onChange}
                       placeholder="Display Name"
                       autoFocus
                       className="formInput"
                />
                <input type="submit"
                       value="저장"
                       className="formBtn"
                       style={{
                           marginTop: 10,
                       }}
                />
            </form>
            <span className="formBtn cancelBtn logOut"
                  onClick={onLogout}>
            로그아웃
            </span>
        </div>
    );
};


export default Profile;
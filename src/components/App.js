import React, {useState, useEffect} from 'react';
import Router from "components/Router";
import {authService} from "myFirebase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    // useEffect : component가 mount 될 때 시작되는 hook
    useEffect(() => {
        // onAuthStateChanged : 사용자의 로그인 상태의 변화를 관찰하는 firebase event listener
        // firebase 초기화, 로그아웃, 계정 생성, 로그인 때에도 트리거 발생
        // https://firebase.google.com/docs/auth/web/manage-users?hl=ko
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);

    return <>
        {init ? <Router isLoggedIn={isLoggedIn} userObj={userObj}/> : "initializing..."}
    </>;
}

export default App;

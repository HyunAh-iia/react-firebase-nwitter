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
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setIsLoggedIn(false);
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);

    const refreshUser = () => {
        // 객체가 너무 클 경우 리액트가 변화감지를 어려워하니 object의 크기를 줄이든 새로운 객체로 인식하게끔 하면 됨!
        // 강제인식 : setUserObj(Object.assign({}, user}
        // 여튼 authService.currentUser에는 너무 많은 양의 정보가 담겨있기때문에 필요한 정보 uid, displayName, updateProfile()만 추출하는 방식으로 접근
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
                uid: user.uid,
                updateProfile: (args) => user.updateProfile(args),
        });
    }

    return <>
        {init ? <Router refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/> : "initializing..."}
    </>;
}

export default App;

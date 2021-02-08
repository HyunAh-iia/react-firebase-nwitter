import {React, useEffect} from 'react';
import {authService, dbService} from "../myFirebase";

const Profile = ({userObj}) => {
    const onLogout = () => authService.signOut();
    const getMyTweets = async () => {
        const tweets = await dbService.collection("tweets")
            .where("userId", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();
        console.log(tweets.docs.map(doc=> doc.data()));
    };

    useEffect(() => {
        getMyTweets();
    }, []);

    return (
        <>
            <button onClick={onLogout}>로그아웃</button>
            <span>Profile</span>
        </>
    );
};


export default Profile;
import React, {useEffect, useState} from "react";
import {dbService} from "myFirebase";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({userObj}) => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        dbService.collection("tweets")
            .orderBy("createdAt", "desc")
            .onSnapshot(snapshot => { //snapshot => QuerySnapshot
            //snapshot.docs => QueryDocumentSnapshot
            const tweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(), // QueryDocumentSnapshot.data()
            }));
            setTweets(tweetArray);
        })
    }, []);

    return <div className="container">
        <TweetFactory userObj={userObj}/>
        <div style={{ marginTop: 30 }}>
            {tweets.map((doc) => (
                <Tweet key={doc.id}
                       tweetObj={doc}
                       isOwner={doc.userId === userObj.uid}
                />
            ))}
        </div>
    </div>;
}
export default Home;
import React, {useEffect, useState} from 'react';
import {dbService} from "../myFirebase";

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        dbService.collection("tweets").onSnapshot(snapshot => {
            //snapshot.docs => QueryDocumentSnapshot :https://firebase.google.com/docs/reference/node/firebase.firestore.QueryDocumentSnapshot
            const tweetArray = snapshot.docs.map( doc=> ({
                id: doc.id,
                ...doc.data(),
            }));

            setTweets(tweetArray);
        })
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("tweets").add({
            text: tweet,
            createdAt: Date.now(),
            userId: userObj.uid,
        });
        setTweet("");
    };

    const onChange = (e) => {
        const {target: {value}} = e;
        setTweet(value);
    };

    return <div>
        <form>
            <input type="text" value={tweet} onChange={onChange} placeholder="오늘은 어떠셨나요?" maxLength={120}/>
            <input type="submit" onClick={onSubmit} value="tweet"/>
        </form>
        <div>
            {tweets.map((doc) => (
                <div key={doc.id}>
                    <h4>{doc.text}</h4>
                </div>
            ))}
        </div>
    </div>;
}
export default Home;
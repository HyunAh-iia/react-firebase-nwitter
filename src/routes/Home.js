import React, {useEffect, useState} from 'react';
import {dbService} from "myFirebase";
import Tweet from "components/Tweet";

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [previewImage, setPreviewImage] = useState();

    useEffect(() => {
        dbService.collection("tweets").onSnapshot(snapshot => { //snapshot => QuerySnapshot
            //snapshot.docs => QueryDocumentSnapshot
            const tweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(), // QueryDocumentSnapshot.data()
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

    const onFileChange = (e) => {
        const {target: {files}} = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent); // readAsDataURL()가 끝나면, 즉 파일을 읽은 후 트리거 발생
            const {currentTarget: {result}} = finishedEvent;
            setPreviewImage(result);
        };
        reader.readAsDataURL(theFile); // 이미지를 URL 형태로 인코딩 (브라우저를 통해 디코딩하면 이미지로 표시 가능)
    };

    const onClearImage = (e) => {
        setPreviewImage(null);
    }

    return <div>
        <form>
            <input type="text"
                   value={tweet}
                   onChange={onChange}
                   placeholder="오늘은 어떠셨나요?"
                   maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" onClick={onSubmit} value="tweet" />
            {previewImage &&
            <div>
                <img src={previewImage} width="50px" height="50px"/>
                <button onClick={onClearImage}>취소</button>
            </div>}
        </form>
        <div>
            {tweets.map((doc) => (
                <Tweet key={doc.id} tweetObj={doc} isOwner={doc.userId === userObj.uid}/>
            ))}
        </div>
    </div>;
}
export default Home;
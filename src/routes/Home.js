import React, {useEffect, useState} from "react";
import {dbService, storageService} from "myFirebase";
import Tweet from "components/Tweet";
import {v4 as uuidv4} from "uuid";

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [image, setImage] = useState("");

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
        let fileUrl = "";

        if (image) {
            const fileRef = storageService
                .ref() // firebase.storage().ref() returns Reference(https://firebase.google.com/docs/reference/js/firebase.storage.Reference)
                .child(`${userObj.uid}/${uuidv4()}`); //파일명 임의지정 가능. 랜덤 UUID 사용

            const response = await fileRef.putString(image, "data_url"); // Reference.putString() returns UploadTask(https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask)
            fileUrl = await response.ref.getDownloadURL(); // await UploadTask returns UploadTaskSnapshot(https://firebase.google.com/docs/reference/js/firebase.storage.UploadTaskSnapshot)
            console.log("fileUrl =>" + fileUrl);
        }

        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            userId: userObj.uid,
            image: fileUrl,
        };

        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setImage("");
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
            setImage(result);
        };
        reader.readAsDataURL(theFile); // 이미지를 URL 형태로 인코딩 (브라우저를 통해 디코딩하면 이미지로 표시 가능)
    };

    const onClearImage = (e) => {
        setImage(null);
    }

    return <div>
        <form>
            <input type="text"
                   value={tweet}
                   onChange={onChange}
                   placeholder="오늘은 어떠셨나요?"
                   maxLength={120}/>
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" onClick={onSubmit} value="tweet"/>
            {image &&
            <div>
                <img src={image} width="50px" height="50px"/>
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
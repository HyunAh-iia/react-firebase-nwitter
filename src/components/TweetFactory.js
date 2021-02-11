import React, {useState} from "react";
import {dbService, storageService} from "../myFirebase";
import {v4 as uuidv4} from "uuid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

const TweetFactory = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [image, setImage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        let fileUrl = "";

        if (!tweet) {
            return;
        }

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
            imageUrl: fileUrl,
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
        setImage("");
    }

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input type="text"
                       value={tweet}
                       onChange={onChange}
                       placeholder="오늘은 어떠셨나요?"
                       maxLength={120}/>
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />

            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>사진 추가</span>
                <FontAwesomeIcon icon={faPlus}/>
            </label>
            <input id="attach-file"
                   type="file"
                   accept="image/*"
                   onChange={onFileChange}
                   style={{
                       opacity: 0,
                   }}
            />
            {image &&
            <div className="factoryForm__attachment">
                <img src={image}
                     style={{
                         backgroundImage: image,
                     }}
                />
                <div className="factoryForm__clear" onClick={onClearImage}>
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
            }
        </form>
    );
}

export default TweetFactory;
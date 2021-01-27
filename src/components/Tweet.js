import React, {useState} from "react";
import {dbService, storageService} from "myFirebase";

const Tweet = ({tweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [editTweet, setEditTweet] = useState(tweetObj.text);

    const onDelete = async () => {
        const isOk = window.confirm("트윗을 삭제하시겠습니까?");
        if (isOk) {
            const FileRef = await storageService.refFromURL(tweetObj.imageUrl);
            await FileRef.delete();
            await dbService.doc(`tweets/${tweetObj.id}`).delete(); // firebase.firestore().doc(`documentPath`)
        }
    };

    const toggleEditing = () => {
        setEditing((prev) => !prev);
        setEditTweet(tweetObj.text);
    };
    const onChange = (e) => {
        e.preventDefault();
        const {target: {value}} = e;
        setEditTweet(value);
    }
    const onSubmit = async () => {
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: editTweet,
        });
        setEditing(false);
    };

    return (
        <>
            {editing ? (
                <>
                    <form>
                        <input
                            type="text"
                            onChange={onChange}
                            value={editTweet}
                            placeholder="트윗을 수정합니다."
                            required/>
                    </form>
                    <button onClick={toggleEditing}>취소</button>
                    <button type="submit" onClick={onSubmit}>저장</button>
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    <img src={tweetObj.imageUrl} width="50px" height="50px"/>
                    {isOwner && (
                        <>
                            <button onClick={onDelete}>삭제</button>
                            <button onClick={toggleEditing}>수정</button>
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default Tweet;
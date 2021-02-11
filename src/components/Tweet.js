import React, {useState} from "react";
import {dbService, storageService} from "myFirebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

const Tweet = ({tweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [editTweet, setEditTweet] = useState(tweetObj.text);

    const onDelete = async () => {
        const isOk = window.confirm("트윗을 삭제하시겠습니까?");
        if (isOk) {
            !!tweetObj.imageUrl && await storageService.refFromURL(tweetObj.imageUrl).delete();
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
    };

    const onSubmit = async () => {
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: editTweet,
        });
        setEditing(false);
    };

    return (
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input
                            type="text"
                            onChange={onChange}
                            value={editTweet}
                            placeholder="트윗을 수정합니다."
                            autoFocus
                            className="formInput"
                            required/>
                    </form>
                    <button type="submit" onClick={onSubmit} className="formBtn">저장</button>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">취소</span>
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.imageUrl && <img src={tweetObj.imageUrl}/>}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDelete}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt}/>
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Tweet;
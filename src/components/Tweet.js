import React from "react";

const Tweet = ({tweetObj, isOwner}) => (
    <>
        <h4>{tweetObj.text}</h4>
        {isOwner && <>
            <button>Delete</button>
            <button>Edit</button>
        </>}
    </>
)

export default Tweet;
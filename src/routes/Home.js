import React, {useState} from 'react';
import {dbService} from "../myFirebase";

const Home = () => {
    const [tweet, setTweet] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("tweets").add({
            tweet,
            createdAt: Date.now(),

        });
        setTweet("");
    };

    const onChange = (e) => {
        const {target: {value}} = e;
        setTweet(value);
    }
    return <>
        <form>
            <input type="text" value={tweet} onChange={onChange} placeholder="오늘은 어떠셨나요?" maxLength={120}/>
            <input type="submit" onClick={onSubmit} value="tweet"/>
        </form>
    </>;
}
export default Home;
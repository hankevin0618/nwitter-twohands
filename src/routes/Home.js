import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "myBase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([])

    useEffect(() => {
        // real time 을 가능케해주는 listener onSnapshot
        dbService.collection("nweets").onSnapshot(snapShot => {
            // re-render 안하고 한번만 실행되기때문에 foreach 보다 나음
            const nweetArray = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            // 이제 set 해주면 됌
            setNweets(nweetArray)
        })
    }, [])


    return (
        <div>
            <NweetFactory userObj={userObj} />

            <div>
                {nweets.map(nweet => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorID === userObj.uid} />
                ))}
            </div>
        </div>
    )
}
export default Home;


    // 올드버젼이래서 지움 ---- >
    // const getNweets = async () => {
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach(document => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //             authorName: userObj.displayName,
    //         }
    //         setNweets((prev) => [nweetObject, ...prev])
    //     })
    // }
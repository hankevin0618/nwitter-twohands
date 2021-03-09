import Nweet from "components/Nweet";
import { dbService, storageService } from "myBase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])
    const [attachment, setAttachment] = useState("")

    useEffect(() => {
        // real time 을 가능케해주는 listener onSnapshot
        dbService.collection("nweets").onSnapshot(snapShot => {
            // re-render 안하고 한번만 실행되기때문에 foreach 보다 나음
            const nweetArray = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            // 이제 set 해주면 됌
            setNweets(nweetArray)
        })
    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = "";

        if (attachment !== "") {
            // Storage에 사진을 넣고서 url을 cloud firestore에 같이보내준다 
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`) // 이건 약간 dummy ref를 만드는 것. 여기다가 이제 진짜 데이터를 연결시켜줘야함
            const response = await attachmentRef.putString(attachment, "data_url")
            attachmentURL = await response.ref.getDownloadURL()
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorID: userObj.uid,
            creatorName: userObj.displayName,
            attachmentURL
        }

        await dbService.collection("nweets").add(nweetObj)
        setNweet("")
        setAttachment("")
    }
    const onChange = (event) => {
        const { target: { value } } = event
        setNweet(value);
    }

    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        // use FileReader API
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile)
    }
    const onClearAttachment = () => {
        setAttachment(null)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={140} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment &&
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>

                }
            </form>
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
import { dbService, storageService } from "myBase";
import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid' // 랜덤한 아이디를 만들어주는 모듈

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("")
    const [attachment, setAttachment] = useState("")

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
    )
}

export default NweetFactory;
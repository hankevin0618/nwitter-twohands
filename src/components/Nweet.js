import { dbService, storageService } from 'myBase';
import React, { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text)
    const onDelete = async () => {
        const ok = window.confirm("Are you sure?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete()
            // storage에 사진이 저장되기떄문에 밑처럼 사진의 url의 ref를 따라가서 storage안의 파일을 지워준다 위와 다르게
            await storageService.refFromURL(nweetObj.attachmentURL).delete()
        }
    }
    const toggleEditing = () => setEditing(prev => !prev)
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewNweet(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet
        })
        toggleEditing()
    }

    return (
        <div>
            {editing
                ?
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" onChange={onChange} placeholder="Edit your Nweet" value={newNweet} required />
                        <input type="submit" value="Update" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
                :
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentURL && <img src={nweetObj.attachmentURL} width="50px" height="50px" />}
                    {isOwner && <>
                        <button onClick={onDelete}>Delete</button>
                        <button onClick={toggleEditing}>Edit</button>
                    </>}
                </>

            }
        </div>
    )
}

export default Nweet;
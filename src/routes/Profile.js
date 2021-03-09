import { authService, dbService } from "myBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    let history = useHistory()
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/')
    }
    // Profile 에서는 user가 누군지 모르기때문에 그것부터 알려줘야한다
    const getMyNweets = async () => {
        // this is how it filters the nweets I posted
        const nweets = await dbService
            .collection("nweets")
            .where("creatorID", "==", userObj.uid)
            .orderBy("CreatedAt")
            .get()
        // console.log(nweets.docs)
        // console.log(nweets.docs.map((doc) => doc.data()));

    }
    useEffect(() => {
        getMyNweets();
    }, [])

    const onChange = (event) => {
        const { target: { value } } = event
        setNewDisplayName(value)
    }
    const onSubmit = async (event) => {
        event.preventDefault()
        // only if user wants to make changes
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            })
            refreshUser();
        }

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display Name" value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}
export default Profile;
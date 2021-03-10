import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "myBase";
import React, { useState } from "react";

const Auth = () => {

    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const toggleAccount = () => setNewAccount((prev) => !prev)


    const onSocialClick = async (event) => {
        const { target: { name } } = event;
        //우선 구글이든 뭐든 provider를 정의해놓고 나중에 입힌다
        // firebaseInstance 는 모듈로부터 가져와야하기때문에 myBase.js 를 조정했다
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        // provicer detection이 되고나면 팝업창 띄우기를 진행한다
        const data = await authService.signInWithPopup(provider)
        console.log(data)
    }


    return (
        <div>
            <AuthForm newAccount={newAccount} setError={setError} />
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with GitHub</button>
            </div>
            <button onClick={toggleAccount}>{newAccount ? "Sign In" : "Create New Account"}</button>

            <p style={{ color: 'red' }}>{error}</p>

        </div>
    )
}


export default Auth;
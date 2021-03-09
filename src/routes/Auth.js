import { authService, firebaseInstance } from "myBase";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const toggleAccount = () => setNewAccount((prev) => !prev)
    const onChange = (event) => {
        const { target: { name, value } } = event //deconstructing
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(email, password) // use await because it says Promise

            } else {
                // log in account
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            // console.log(data)
        } catch (error) {
            setError(error.message)
        }
    }

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
            <form onSubmit={onSubmit}>
                <input name="email" type="text" onChange={onChange} placeholder="Email" required value={email} />
                <input name="password" type="password" onChange={onChange} placeholder="Password" required value={password} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            </form>
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
import { authService } from "myBase";
import React, { useState } from "react";

const AuthForm = ({ newAccount, setError }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


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
    return (

        <form className="test" onSubmit={onSubmit}>
            <input name="email" type="text" onChange={onChange} placeholder="Email" required value={email} />
            <input name="password" type="password" onChange={onChange} placeholder="Password" required value={password} />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        </form>
    )

}

export default AuthForm;
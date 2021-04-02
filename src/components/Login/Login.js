import React, { useContext, useState } from 'react';
import './Login.css';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './FirebaseConfig';
import GoolgeIcon from '../../media/socialicon/google.svg';
import GitHubIcon from '../../media/socialicon/github.svg';
import {
    BrowserRouter as Router,
    useHistory,
    useLocation
} from "react-router-dom";

const Login = () => {
    document.title = 'Login - FoodBasket.Com';
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    // SignIn With Google
    const handleGoogleSignIn = async () => {
        const google = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(google)
            .then((result) => {
                const { displayName, email, photoURL, emailVerified } = result.user;
                const signedInUser = { username: displayName, useremail: email, userpicture: photoURL, verified: emailVerified }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    };

    // SignIn With GitHub
    const handleGithubSignIn = async () => {
        const github = new firebase.auth.GithubAuthProvider();
        firebase
            .auth()
            .signInWithPopup(github)
            .then((result) => {
                const { displayName, email, photoURL, emailVerified } = result.user;
                const signedInUser = { username: displayName, useremail: email, userpicture: photoURL, verified: emailVerified }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }
    return (
        <div className="container">
            <div className="Login">
                <h3>Social Login</h3>
                <button className="GoogleSignIn-Btn" onClick={handleGoogleSignIn}><img src={GoolgeIcon} alt="Google Login" /> <p>Continue with Google</p></button><br />
                <button className="GitHubSignIn-Btn" onClick={handleGithubSignIn}><img src={GitHubIcon} alt="GitHub Login" /> <p>Continue with GitHub</p></button>
            </div>
        </div>
    );
};

export default Login;
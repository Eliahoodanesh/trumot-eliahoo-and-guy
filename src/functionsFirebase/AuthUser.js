import React, { useState } from "react";
import { auth, db } from "../config/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

// פונקציית signUp 
export const signUp = async (firstName, lastName, location, phoneNumber, email, username, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Creating user with email and password
        const user = userCredential.user;

        // Saving user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            location,
            phoneNumber,
            username,
            email: user.email,
            createdAt: new Date(),
        });
        
        console.log("User registered and data saved");
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};

// קומפוננטת Auth
export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email); // Null check to prevent errors

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Signed in successfully");
        } catch (err) {
            console.error("Error signing in:", err.message);
            alert(err.message); // Show error message to the user
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut(); // תיקון לפונקציה signOut
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <label>מייל</label>
            <input
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
            />
            <label>סיסמא</label>
            <input
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
            />
            <div className="center-button">
                <button onClick={signIn}>התחבר</button>
            </div>
        </div>
    );
};

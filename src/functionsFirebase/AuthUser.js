import React, { useState } from "react";
import { auth, db } from "../config/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import {useNavigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

// פונקציית signUp 
export const signUp = async (firstName, lastName, location, phoneNumber, email, username, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password); // יצירת משתמש
        const user = userCredential.user;

        // שמירת פרטי המשתמש ב-Firestore
        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            location,
            phoneNumber,
            username,
            email: user.email,
            createdAt: new Date(),
        });

        console.log("משתמש נרשם והמידע נשמר");
    } catch (error) {
        console.error("שגיאה בהרשמה:", error);
        throw error;
    }
};

export const useLogout = () => {
    const logout = async () => {
        try {
            await auth.signOut(); // תיקון לפונקציה signOut
            console.log("logged out");
        } catch (err) {
            console.error(err);
        }
    };
    return{logout};
}

// קומפוננטת Auth
export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const currentUser = useAuth(); // שימוש ב-Hook של useAuth שיצרנו

    console.log(auth?.currentUser?.email); // Null check to prevent errors

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Signed in successfully");
            navigate("/");
        } catch (err) {
            console.error("Error signing in:", err.message);
            alert(err.message); // Show error message to the user
        }
    };

    // אם המשתמש כבר מחובר, נפנה אותו חזרה לדף הראשי
    if (currentUser) {
        navigate("/");
        return null;
    }

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

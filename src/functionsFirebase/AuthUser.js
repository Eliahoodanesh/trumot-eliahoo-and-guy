import React, { useState, useEffect } from "react";
import { auth, db } from "../config/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; // הוספת sendPasswordResetEmail
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

export const signUp = async (firstName, lastName, location, phoneNumber, email, username, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

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
            await auth.signOut();
            console.log("logged out");
        } catch (err) {
            console.error(err);
        }
    };
    return { logout };
}

export const Auth = () => {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const [email, setEmail] = useState(""); // Define state for email
    const [password, setPassword] = useState(""); // Define state for password

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Signed in successfully");
            navigate("/");
        } catch (err) {
            console.error("Error signing in:", err.message);
            alert(err.message);
        }
    };

    const forgotPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("נשלחה הודעת איפוס סיסמא לאימייל שלך");
        } catch (error) {
            console.error("שגיאה בשליחת הודעת איפוס סיסמא:", error.message);
            alert(error.message);
        }
    };

    return (
        <div>
            {currentUser ? (
                <p>אתה כבר מחובר.</p>
            ) : (
                <>
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
                    <div className="text-center">
                        <button onClick={() => signIn(email, password)}>התחבר</button>
                    </div>
                    <div className="text-center">
                        <button onClick={() => forgotPassword(email)}>שכחתי סיסמא</button>
                    </div>
                </>
            )}
        </div>
    );
};
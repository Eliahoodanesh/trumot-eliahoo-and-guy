import React, { useState, useEffect } from "react";
import { auth, db } from "../config/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

const isEmailInUse = async (email) => {
    try {
        const methods = await auth.fetchSignInMethodsForEmail(email);
        return methods.length > 0;
    } catch (error) {
        console.error("Error checking email:", error);
        throw error;
    }
};

export const signUp = async (email, password, additionalData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email,
            ...additionalData,
            isAdmin: false, // Default to false or based on additionalData
            createdAt: new Date()
        });

        console.log("User signed up and document created successfully");
        return user;
    } catch (err) {
        console.error("Error signing up:", err.message);
        alert(err.message);
    }
};


export const signIn = async (email, password, isAdmin, navigate) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("Signed in user:", user.uid);

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            console.log("User data:", userData);

            if (isAdmin && userData.isAdmin) {
                console.log("Admin signed in successfully");
                navigate("/admin-dashboard");
            } else if (!isAdmin) {
                console.log("User signed in successfully");
                navigate("/");
            } else {
                throw new Error("User is not an admin");
            }
        } else {
            console.error("User document does not exist in Firestore for user ID:", user.uid);
            throw new Error("User does not exist");
        }
    } catch (err) {
        console.error("Error signing in:", err.message);
        alert(err.message);
    }
};


export const forgotPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("נשלחה הודעת איפוס סיסמא לאימייל שלך");
    } catch (error) {
        console.error("שגיאה בשליחת הודעת איפוס סיסמא:", error.message);
        alert(error.message);
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
};

export const Auth = () => {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const handleSignUp = async () => {
        const additionalData = { isAdmin }; // Include additional data if needed
        await signUp(email, password, additionalData);
    };

    const handleSignIn = async () => {
        await signIn(email, password, isAdmin, navigate);
    };

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <label>
                <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
                אני מנהל
            </label>
            <button onClick={handleSignIn}>התחבר</button>
            <button onClick={handleSignUp}>הירשם</button>
        </div>
    );
};

export default Auth;
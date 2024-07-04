import React, { useState, useEffect } from "react";
import { auth, db } from "../config/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

export const signUp = async (firstName, lastName, location, phoneNumber, email, username, password, isAdmin) => {
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
            isAdmin,
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
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
                throw new Error("User does not exist");
            }
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
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            onChange={() => setIsAdmin(!isAdmin)}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                            אני מנהל
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

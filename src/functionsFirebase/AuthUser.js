import React, { useState, useEffect } from "react";
import { auth, db } from "../config/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./UseAuth";

// פונקציית הרשמה
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

// פונקציה ליציאה מהחשבון
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

// פונקציית אימות
export const Auth = () => {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // סטטוס טעינה כדי למנוע גישה לתוכן לפני אימות

    useEffect(() => {
        if (currentUser) {
            navigate("/"); // הפניה לדף הבית
        }
    }, [currentUser, navigate]);

    // פונקציה לבדוק אם המשתמש קיים ב-Firestore לפני התחברות
    const checkIfUserExists = async (uid) => {
        const userDoc = await getDoc(doc(db, "users", uid));
        return userDoc.exists();
    };

    // פונקציית התחברות
    const signIn = async (email, password) => {
        setLoading(true); // מתחילים את הטעינה
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // בדיקה אם המשתמש קיים ב-Firestore
            const userExists = await checkIfUserExists(user.uid);
            if (!userExists) {
                await auth.signOut();
                alert("משתמש זה נמחק מהמערכת.");
                setLoading(false); // סיום הטעינה במקרה של שגיאה
                navigate("/MyForm");
                return;
            }

            console.log("Signed in successfully");
            setLoading(false); // סיום הטעינה לאחר הצלחה
        } catch (err) {
            console.error("Error signing in:", err.message);
            alert(err.message);
            setLoading(false); // סיום הטעינה במקרה של שגיאה
        }
    };

    // פונקציה לשליחת הודעת איפוס סיסמא
    const forgotPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("נשלחה הודעת איפוס סיסמא לאימייל שלך");
        } catch (error) {
            console.error("שגיאה בשליחת הודעת איפוס סיסמא:", error.message);
            alert(error.message);
        }
    };

    if (loading) {
        return <div>טוען...</div>; // הצגת הודעת טעינה בזמן הבדיקה
    }

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

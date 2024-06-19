import React from 'react'
import { useEffect } from "react";
import { auth } from "../config/Firebase"; // אמורה להיות פונקציית auth
import { useNavigate } from "react-router-dom";

// פונקציית useAuth
export const useAuth = () => {
    const navigate = useNavigate();
    const currentUser = auth.currentUser;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // המשתמש מחובר
                console.log("משתמש מחובר:", user.email);
            } else {
                // אין משתמש מחובר
                console.log("אין משתמש מחובר");
                navigate("/login"); // ניתוב לדף ההתחברות אם אין משתמש מחובר
            }
        });

        return unsubscribe;
    }, [navigate]);

    return currentUser;
};

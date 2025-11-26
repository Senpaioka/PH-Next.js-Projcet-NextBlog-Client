"use client";

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";



const provider = new GoogleAuthProvider();
provider.addScope('email');
provider.addScope('profile'); 



function AuthProvider({children}) {
  
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);


        // gmail authentication
        async function authenticateWithGoogle() {
            setIsLoading(true);
            try {
                return await signInWithPopup(auth, provider)
                // If an error happens, it automatically throws it up the call stack. 
            }
            finally {
                setIsLoading(false);
            }
        }




        // register with email
        async function registerWithEmailAndPassword(name, url, email, password) {
            setIsLoading(true);

            try {
                const result = await createUserWithEmailAndPassword(auth, email, password);
                const currentUser = result.user;

                await updateProfile(currentUser, {
                displayName: name,
                photoURL: url,
                });
                return currentUser; 

            } catch (error) {
                console.log(error.message);
                throw error; 
            } finally {
                setIsLoading(false);
            }
        }


        
        // manual login
        async function loggingInVerifiedUser(email, password){
            setIsLoading(true);

            try {
                return await signInWithEmailAndPassword(auth, email, password);
            }
            finally {
                setIsLoading(false);
            }    
        }



        // logging out user
        async function logoutUser() {
            try {
                const exitUser =  await signOut(auth);
                setUser(null);
                return exitUser;
            }
            finally {
                setIsLoading(false);
            }
        }


    // tracking user
    // useEffect(() => {
    //     // on mount
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setIsLoading(true);
    //         if(currentUser) {
    //             setUser(currentUser);
    //             setIsLoading(false);
    //         }
    //     })

    //     // on unmount
    //     return () => {
    //         unsubscribe();
    //     }
    // })
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setIsLoading(true);

        try {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null); // 🔥 important for logout or expired session
            }
        } catch (err) {
            console.error("Auth state error:", err);
        } finally {
            setIsLoading(false); // 🔥 always stops loading
        }
    });

    return () => unsubscribe();
    }, []);


    
    // info
    const authInfo = {
        user,
        isLoading,
        authenticateWithGoogle,
        registerWithEmailAndPassword,
        loggingInVerifiedUser,
        logoutUser,
    }


  
    return (
        <AuthContext value={authInfo}>
        {children}
        </AuthContext>
    );
}

export default AuthProvider;
import React, { useState, createContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({});

export const FirebaseContext = createContext();

const FirebaseContextProvider = (props) => {
    const firestore = firebase.firestore();
    const searchesRef = firestore.collection("search");
    const [searches] = useCollectionData(searchesRef);

    return (
        <FirebaseContext.Provider value={{ searches }}>{props.children}</FirebaseContext.Provider>
    );
};

export default FirebaseContextProvider;

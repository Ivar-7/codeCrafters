import React, { createContext, useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
import { auth } from "../../config/firebaseCon";

// Global Dashboard Context
export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  // State variable to store data
  let [user, setUser] = useState(null);
  let [isDarkMode, setIsDarkMode] = useState(true);
  let [loading, setLoading] = useState(true);

  // Function to fetch user data from Firestore
  async function getUser() {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }

  // Function to fetch users data from Firestore
  // async function getUsers() {
  //   const usersCollection = collection(db, "Users");
  //   const usersSnapshot = await getDocs(usersCollection);
  //   const usersList = usersSnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setUsers(usersList);
  // }

  // Fetch users and events data when the component mounts
  useEffect(() => {
    Promise.all([getUser()]).then(() => {
      console.log("Data fetched successfully");
      setLoading(false);
    });
  }, []);

  // Provide users and events data to the child components using context
  return (
    <DashboardContext.Provider
      value={{
        user,
        setUser,
        isDarkMode,
        setIsDarkMode,
        loading,
        setLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

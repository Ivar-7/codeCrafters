import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../config/firebaseCon";

// Global Dashboard Context
export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  // State variable to store data
  let [user, setUser] = useState(null);
  let [users, setUsers] = useState(null);
  let [events, setEvents] = useState(null);
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
  async function getUsers() {
    const usersCollection = collection(db, "Users");
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersList);
  }

  // Function to fetch events data from Firestore
  async function getEvents() {
    const eventsCollection = collection(db, "Events");
    const eventsSnapshot = await getDocs(eventsCollection);
    const eventsList = eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setEvents(eventsList);
  }

  // Fetch users and events data when the component mounts
  useEffect(() => {
    Promise.all([getUser(), getUsers(), getEvents()]).then(() => {
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
        users,
        setUsers,
        events,
        setEvents,
        loading,
        setLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

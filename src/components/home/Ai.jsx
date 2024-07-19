import React, { useState, useContext } from "react";
import { DashboardContext } from "../api/FirebaseApi";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebaseCon";
import "bootstrap/dist/css/bootstrap.min.css";

function Ai() {
  const { messages, setMessages } = useContext(DashboardContext);
  const [currentMessage, setCurrentMessage] = useState("");

  // Function to add a message to Firestore
  const sendMessageToFirebase = async (messageText) => {
    try {
      const docRef = await addDoc(collection(db, "Messages"), {
        text: messageText,
        userId: "yourUserId", // Replace with actual user ID
      });
      // Update the local state with the new message including the generated id
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: messageText, id: docRef.id },
      ]);
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  // Function to delete a message from Firestore
  const deleteMessageFromFirebase = async (messageId) => {
    try {
      await deleteDoc(doc(db, "Messages", messageId));
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId)
      );
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!currentMessage.trim()) return;
    sendMessageToFirebase(currentMessage);
    setCurrentMessage("");
  };

  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-header">Chatbox</div>
        <div className="card-body">
          <div
            className="messages mb-3"
            style={{ height: "300px", overflowY: "scroll" }}
          >
            {messages &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className="alert alert-secondary d-flex justify-content-between align-items-center"
                  role="alert"
                >
                  <span>{message.text}</span>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => deleteMessageFromFirebase(message.id)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={currentMessage}
                onChange={handleMessageChange}
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Ai;

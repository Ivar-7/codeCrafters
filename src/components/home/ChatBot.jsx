import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const userMessage = { message: inputMessage, isUser: true };
      setMessages([...messages, userMessage]);
      try {
        const response = await axios.post("http://127.0.0.1:5000/api", {
          message: inputMessage,
        });
        const botMessage = { message: response.data, isUser: false };
        setMessages([...messages, userMessage, botMessage]);
      } catch (error) {
        console.error("Error sending message: ", error);
      }
      setInputMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat Bot</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.isUser ? "user-message" : "bot-message"}
          >
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div>
        <textarea
          className="message-input"
          rows="3"
          placeholder="Type your message here"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        ></textarea>
      </div>
      <button type="button" className="send-btn" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default ChatBot;

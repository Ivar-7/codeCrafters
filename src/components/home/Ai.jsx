import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Ai() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!currentMessage.trim()) return;
    setMessages([...messages, currentMessage]);
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
            {messages.map((message, index) => (
              <div key={index} className="alert alert-secondary" role="alert">
                {message}
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

import React, { useState, useRef, useEffect } from "react";

export default function Chatbot({ onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    setMessages([...messages, { text: message, isBot: false }]);
    const userInput = message;
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/airoutes/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();

      // Add bot response to chat
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { text: data.reply, isBot: true }]);
        setLoading(false);
      }, 500); // Small delay for better UX
    } catch (error) {
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          { text: "Sorry, I couldn't process your request.", isBot: true },
        ]);
        setLoading(false);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div
      className="chatbot-container"
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: "350px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0px 5px 20px rgba(0,0,0,0.15)",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        zIndex: "9999", // Extremely high z-index to ensure it stays on top
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#2e7d32",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "10px",
            }}
          >
            <span style={{ color: "#2e7d32", fontWeight: "bold" }}>AI</span>
          </div>
          <h3 style={{ margin: 0, fontWeight: "500" }}>Assistant</h3>
        </div>
        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "none",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            padding: "5px",
          }}
        >
          ✖
        </button>
      </div>

      {/* Chat Messages Area */}
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          padding: "15px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.isBot ? "flex-start" : "flex-end",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "10px 15px",
                borderRadius: msg.isBot
                  ? "0 15px 15px 15px"
                  : "15px 0 15px 15px",
                backgroundColor: msg.isBot ? "white" : "#2e7d32",
                color: msg.isBot ? "#333" : "white",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                padding: "10px 15px",
                borderRadius: "0 15px 15px 15px",
                backgroundColor: "white",
                color: "#333",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div className="typing-indicator">
                <span style={{ marginRight: "4px" }}>•</span>
                <span style={{ marginRight: "4px" }}>•</span>
                <span>•</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: "10px 15px",
          borderTop: "1px solid #eaeaea",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px 15px",
            border: "1px solid #e0e0e0",
            borderRadius: "20px",
            marginRight: "10px",
            outline: "none",
            fontSize: "14px",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background-color 0.2s",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <span style={{ fontSize: "18px" }}>→</span>
        </button>
      </div>
    </div>
  );
}

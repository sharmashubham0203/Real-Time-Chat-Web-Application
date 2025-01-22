import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);
  const latestMessageRef = useRef();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    localStorage.removeItem("chatHistory");

    const socket = new WebSocket("https://real-time-chat-web-application-i7ha.onrender.com");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const messageData = event.data;

      if (messageData instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const message = reader.result;
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "Server", text: message },
          ]);
        };
        reader.readAsText(messageData);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "Server", text: messageData },
        ]);
      }
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "User", text: message },
    ]);

    ws.send(message);

    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.push({ sender: "User", text: message });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

    setMessage("");
  };

  useEffect(() => {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setMessages(chatHistory);
  }, []);

  useEffect(() => {
    // Scroll to the latest message whenever messages change
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-between w-screen h-screen bg-purple-300">
      {/* Navbar */}
      <nav className="text-center mb-4 p-4">
        <img className="w-12 h-12 mx-auto" src="image2.png" alt="Chat Logo" />
        <h1 className="text-blue-500 font-serif text-4xl sm:text-2xl md:text-3xl text-center">Welcome to ChatterBox</h1>
      </nav>

      {/* Chat Container */}
      <div
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 overflow-y-auto mb-2"
        style={{
          height: "40vh", // Fixed height for consistent message window size
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 mb-3 rounded-lg border-2 ${
              msg.sender.toLowerCase() === "user"
                ? "bg-blue-100 text-right"
                : "bg-green-100 text-left"
            }`}
          >
            <div className="font-semibold text-gray-700">{msg.sender}:</div>
            <div className="text-gray-800">{msg.text}</div>
          </div>
        ))}
        {/* Dummy div to track the latest message */}
        <div ref={latestMessageRef}></div>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-xl flex items-center justify-center">
        <form
          onSubmit={handleSendMessage}
          className="w-full flex items-center space-x-2"
        >
          <input
            type="text"
            id="messageInp"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="w-4/5 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>

      {/* Logout Button */}
      <div className="mt-4 mb-4 text-center">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;

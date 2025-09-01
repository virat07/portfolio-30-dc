import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import chatNotificationSound from "../assets/chat_notification.mp3";

const ChatButtonComponent = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const notificationSound = new Audio(chatNotificationSound);

  useEffect(() => {
    notificationSound.load();
  }, []);

  useEffect(() => {
    if (isOpen && chatMessages.length === 0) {
      const welcomeMessage = {
        role: "assistant",
        content: "Hello! How can I assist you today?",
      };
      setChatMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = async (content, role) => {
    if (!content.trim()) return;
    const limitedContent = content.split(" ").slice(0, 50).join(" ");
    const newMessage = { role, content: limitedContent };
    setChatMessages((prev) => [...prev, newMessage]);
    setIsSending(true);
    setError("");

    try {
      const assistantMessage = "This is a mock response from assistant.";
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant", content: assistantMessage },
        ]);
        setIsSending(false);
      }, 800);
    } catch (err) {
      setError("Oops! Something went wrong. Please try again later.");
      setIsSending(false);
    }
  };

  const handleSend = () => {
    sendMessage(message, "user");
    setMessage("");
  };

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  const isDark = theme === "dark";

  return (
    <div>
      {!isOpen && (
        <button
          onClick={toggleChatWindow}
          className={`px-4 py-2 rounded-full fixed bottom-4 right-4 z-50 flex items-center space-x-2 hover:scale-105 transition-transform duration-300 ${
            isDark ? "bg-gray-700 text-white" : "bg-yellow-400 text-gray-900"
          }`}
        >
          <span>💬</span>
          <span className="font-semibold">Chat</span>
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 md:right-8 w-[95%] max-w-md h-[80vh] md:h-[500px] shadow-lg rounded-xl flex flex-col z-50 transition-colors duration-300 ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          {/* Header */}
          <div
            className={`flex justify-between items-center p-4 border-b transition-colors duration-300 ${
              isDark ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <h3 className="text-lg font-bold">👋 Chat with me</h3>
            <button
              onClick={toggleChatWindow}
              className={isDark ? "text-gray-300 hover:text-gray-100" : "text-gray-800 hover:text-gray-600"}
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col space-y-2">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? `self-end shadow ${isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`
                    : `self-start shadow ${isDark ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-900"}`
                }`}
              >
                {msg.role === "user" ? (
                  <div className="flex items-center justify-end">
                    <span className="mr-2">{msg.content}</span>
                    <FaUser className={isDark ? "text-gray-300" : "text-gray-700"} />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FaRobot className={isDark ? "text-gray-400 mr-2" : "text-gray-500 mr-2"} />
                    <span>{msg.content}</span>
                  </div>
                )}
              </div>
            ))}
            {isSending && (
              <div className="flex items-center space-x-2 animate-pulse">
                <span>...</span>
                <FaRobot className={isDark ? "text-gray-400" : "text-gray-500"} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className={`flex border-t p-3 space-x-2 transition-colors duration-300 ${
              isDark ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <input
              type="text"
              className={`flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-white focus:ring-yellow-400"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-yellow-400"
              }`}
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className={`p-2 rounded-lg transition ${
                isDark ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500" : "bg-yellow-400 text-white hover:bg-yellow-500"
              }`}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButtonComponent;

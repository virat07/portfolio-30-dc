import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import { FaPaperPlane, FaUser, FaRobot, FaTimes } from "react-icons/fa";
import chatNotificationSound from "../assets/chat_notification.mp3";

// Initialize OpenAI instance with environment variable API key
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

const ChatButtonComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [unreadMessages, setUnreadMessages] = useState(0);

  const notificationSound = new Audio(chatNotificationSound);

  useEffect(() => {
    notificationSound.load(); // Ensure the sound is loaded initially
  }, []);

  useEffect(() => {
    if (isOpen) {
      sendMessage("Hello! How can I assist you today?", "assistant");
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatMessages.length > 0 && !isOpen) {
      setUnreadMessages((prev) => prev + 1);
    }
  }, [chatMessages, isOpen]);

  useEffect(() => {
    if (unreadMessages > 0) {
      document.title = `(${unreadMessages}) New Message - Chat`;
      notificationSound.play();
    } else {
      document.title = "Chat";
    }
  }, [unreadMessages, notificationSound]);

  useEffect(() => {
    // Ensure chat is closed on page refresh
    const handleBeforeUnload = () => {
      setIsOpen(false);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const sendMessage = async (content, role) => {
    // Limit message to maximum 50 words
    const limitedContent = content.split(" ").slice(0, 50).join(" ");
    const newMessage = { role, content: limitedContent };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsSending(true);
    setError(""); // Reset error

    try {
      const response = await fetch("https://chat-gpt26.p.rapidapi.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "135d7f1870mshc25defd42387803p104571jsn47d659645e77",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-0125",
          messages: [{ role: "user", content: limitedContent }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const completion = await response.json();
      const assistantMessage = completion.choices[0].message.content;
      const newAssistantMessage = {
        role: "assistant",
        content: assistantMessage,
      };

      setChatMessages((prevMessages) => [...prevMessages, newAssistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setError("Oops! Something went wrong. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && message.trim() !== "" && !isSending) {
      sendMessage(message, "user");
      setMessage("");
    }
  };

  const handleSendClick = () => {
    if (message.trim() !== "" && !isSending) {
      sendMessage(message, "user");
      setMessage("");
    }
  };

  const toggleChatWindow = () => {
    if (isOpen) {
      resetChatState();
    }
    setIsOpen(!isOpen);
    setUnreadMessages(0); // Reset unread messages when chat is opened/closed
  };

  const resetChatState = () => {
    setChatMessages([]);
    setMessage("");
    setError("");
  };

  return (
    <div>
      {!isOpen && (
        <button
          onClick={toggleChatWindow}
          className="bg-gray-700 text-white px-4 py-2 rounded-full fixed bottom-4 right-4 transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <span className="flex items-center">
            <span className="mr-2 text-lg">💬</span>
            <span className="text-lg font-semibold">Let's Chat</span>
          </span>
        </button>
      )}
      {isOpen && (
        <div className="chat-window bg-gray-200 shadow-lg rounded-lg p-4 flex flex-col h-80 w-80 fixed bottom-20 right-4 transform hover:scale-100 transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">👋 Hey there!</h3>
            <button
              onClick={toggleChatWindow}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="chat-area overflow-y-auto flex-grow p-2 rounded-lg bg-white">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg max-w-xs ${
                  msg.role === "user"
                    ? "bg-white text-gray-800 shadow-md self-end text-right"
                    : "bg-gray-100 text-gray-800 shadow-md self-start"
                }`}
              >
                {msg.role === "user" ? (
                  <div className="flex items-center justify-end">
                    <span className="mr-2">{msg.content}</span>
                    <FaUser className="text-gray-700" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FaRobot className="text-gray-500 mr-2" />
                    <span>{msg.content}</span>
                  </div>
                )}
              </div>
            ))}
            {isSending && (
              <div className="flex items-center justify-start mt-2">
                <span className="animate-pulse mr-2">...</span>
                <FaRobot className="text-gray-500" />
              </div>
            )}
            {error && (
              <div className="text-red-500 mt-2 text-center">
                {error}
                <div className="text-gray-500 mt-2 text-center">
                  Feel free to contact me directly at{" "}
                  <a
                    href="mailto:Bharatguptawork07@gmail.com"
                    className="text-blue-500 underline"
                  >
                    Bharatguptawork07@gmail.com
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButtonComponent;

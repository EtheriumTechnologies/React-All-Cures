import React, { useState, useRef, useEffect } from "react";
import { backendHost } from "../../api-config";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import ChatWindow from "./ChatWindow";
import axios from "axios";
import { userId } from "../UserId";
import moment from "moment/moment";

import "./ChatPopup.css";

function ChatButton(props) {
  const { items } = props;
  const [alert, setAlert] = useState();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [socket, setSocket] = useState(null);
  const chatRef = useRef(null);
  const fromId = userId;
  const searchParams = new URLSearchParams(window.location.search);
  const docid = searchParams.get("docid");
  const [toId, setToId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [newMessage, setNewMessage] = useState(false);


  const checkChat = () => {
    if (socket) {
      socket.close();
    }
    axios
      .get(`${backendHost}/chat/${userId}/${props.docid}`)
      .then((res) => {
        const chatId = res.data[0].Chat_id;

        if (chatId != null) {
          setChatId(res.data[0].Chat_id);
          setAlert("Chat already exists");
          setChats(res.data);

          // Create a new WebSocket connection
        const ws = new WebSocket("wss://all-cures.com:8000");
        ws.onopen = () => {
          console.log("Connected to the Chat Server");
          ws.send(`{"Room_No":"${res.data[0].Chat_id}"}`);
        };
        ws.onmessage = (event) => {
          console.log(event);
          const from = event.data.split(":")[0];
          const receivedMessage = event.data.split(":").pop();
          const newChat = {
            Message: receivedMessage,
            From_id: from,
          };
          console.log("Message", from);
          setChats((prevMessages) => [...prevMessages, newChat]);
        };
  
        ws.onclose = function (event) {
          if (event.wasClean) {
            console.log(
              `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
            );
          } else {
            console.log("[close] Connection died");
          }
        };
  
        setSocket(ws);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  useEffect(() => {
    checkChat();
          
  }, []);

  const favouriteForm = () => {
    axios
      .post(`${backendHost}/chat/start/${userId}/${props.docid}`)
      .then((res) => {
        setAlert("Chat started");
        setTimeout(() => {
          setAlert(null);
        }, 4000);
      })
      .catch((err) => console.log(err));
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const newChat = {
      Message: message,
      From_id: userId,
    };
    setNewMessage(true);
    setChats((prevMessages) => [...prevMessages, newChat]);
    const toId = props.docid;
    const chatId = chats[0].Chat_id;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const newMessage = `${fromId}:${toId}:${chatId}:${message}`;
    console.log(newMessage);
    socket.send(newMessage);
    setMessage("");
   

  };
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(chatId);
    if (chatId === null) {
      favouriteForm();
    }

    
   
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="favouriteForm">
        <div className={`chat-box-container ${isOpen ? "open" : ""}`}>
          <button
            className="toggle-button"
            onClick={toggleChatBox}
            style={{ marginTop: -290 }}
          >
            <img
              src={props.imageURL}
              alt="Chat Icon"
              style={{ width: "20px", marginRight: "10px" }}
            />
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {" "}
              {items.prefix} {items.docname_first} {items.docname_middle}{" "}
              {items.docname_last}
            </span>
          </button>
          <div className="chat-box">
            <div className="chat-list" ref={chatRef} style={{flex:1,overflowY:'auto'}} >
              {chats.map((message, index) => {
                const isSender = message.From_id === userId;
                const messageClass = isSender
                  ? "sender-message"
                  : "receiver-message";

                return (
                  <div
                    key={index}
                    className={`message-item ${messageClass}`}
                  >
                    <p
                      className="message-text"
                      style={{
                        color: message.From_id === userId ? "#fff" : "#000",
                      }}
                    >
                      {message.Message}
                      <span
                        className="message-time"
                        style={{
                          color: message.From_id === userId ? "#fff" : "#000",
                        }}
                      >
                        {moment(message.Time).format("h:mm A")}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="chat-footer">
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatButton;


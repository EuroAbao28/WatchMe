import React, { useEffect, useRef, useState } from "react";
import { useUtilityContext } from "../contexts/UtilityContext";
import classNames from "classnames";
import TextHeader from "./TextHeader";
import { IoClose } from "react-icons/io5";
import { RiSendPlane2Line } from "react-icons/ri";
import { socket } from "../contexts/AnimeContext";
import axios from "axios";
import { URL_USER_AUTH, URL_USER_MSG } from "../utils/APIRoutes";
import { MdInfoOutline } from "react-icons/md";
import TimeAgo from "timeago-react";

function ChatTab() {
  const chatContainerRef = useRef(null);

  const {
    user,
    setUser,
    isMessageTabOpen,
    setIsMessageTabOpen,
    messages,
    setMessages,
    setUnreadMessages,
  } = useUtilityContext();

  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const [isLoginLoading, setIsLogInLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const [messageInput, setMessageInput] = useState("");
  const [messageCooldown, setMessageCooldown] = useState(0);

  const [authError, setAuthError] = useState(null);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUserInput({ ...userInput, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLogInLoading(true);

    try {
      const response = await axios.post(`${URL_USER_AUTH}/login`, {
        username: userInput.username,
        password: userInput.password,
      });

      setUser(response.data.user);
      localStorage.setItem("userToken", response.data.token);
      setIsLogInLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setIsLogInLoading(false);
      setAuthError(error.response.data.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!userInput.username || !userInput.password) return;

    setIsCreateLoading(true);

    try {
      const response = await axios.post(`${URL_USER_AUTH}/create`, {
        username: userInput.username,
        password: userInput.password,
      });

      setUser(response.data.user);
      localStorage.setItem("userToken", response.data.token);
      setIsCreateLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setIsCreateLoading(false);
      setAuthError(error.response.data.message);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageInput || messageCooldown > 0) return;

    try {
      const response = await axios.post(URL_USER_MSG, {
        message: messageInput.trim(),
        senderID: user._id,
      });

      const messageData = {
        message: messageInput.trim(),
        createdAt: new Date(),
        senderID: { _id: user._id, username: user.username },
      };

      setMessages([...messages, messageData]);
      setMessageInput("");

      socket.emit("sendMessage", messageData);

      // cooldown
      setMessageCooldown(10);
    } catch (error) {
      console.log(error);
    }
  };

  // Cooldown effect
  useEffect(() => {
    if (messageCooldown === 0) return;

    const intervalId = setInterval(() => {
      setMessageCooldown((prev) => prev - 1);
    }, 1000);

    // Clear interval when cooldown reaches 0
    if (messageCooldown === 0) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [messageCooldown]);

  useEffect(() => {
    setAuthError(null);
  }, [userInput]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleCloseChatTab = () => {
    setIsMessageTabOpen(false);
    setUnreadMessages(false);
  };

  return (
    <div
      className={classNames(
        "fixed overflow-hidden h-1/2  md:border border-t flex  bottom-0 transition-all  flex-col max-md:left-0 right-0   border-gray-300/20  bg-gray-950/90 backdrop-blur-md md:rounded-md md:w-2/3 lg:w-[35rem] md:right-6 md:bottom-6 shadow-lg",
        {
          "opacity-100 z-50": isMessageTabOpen,
          "opacity-0 -z-50": !isMessageTabOpen,
        }
      )}>
      <div className="relative flex justify-between px-6 py-4 border-b border-gray-300/10">
        <TextHeader text={"Community Chat"} />

        <div
          onClick={handleCloseChatTab}
          className="absolute flex items-center justify-center p-3 rounded-full cursor-pointer right-2 top-2 outline-1 outline-gray-300/20 hover:bg-gray-300/5 text-rose-500 aspect-square">
          <IoClose />
        </div>
      </div>

      <div className="relative flex items-center justify-center flex-1">
        {!user.username ? (
          <>
            <div
              className={classNames(
                "absolute top-0 overflow-hidden duration-300 left-0 right-0 flex items-center gap-2 px-6   text-orange-500 transition-all bg-orange-500/10",
                {
                  "h-10": authError,
                  "h-0": !authError,
                }
              )}>
              <MdInfoOutline className="text-lg" />
              <p>{authError}</p>
            </div>

            <div className="flex items-center justify-center flex-1 p-6">
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-4 w-[90%] sm:w-2/3 md:w-1/2">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={userInput.username}
                  minLength={4}
                  maxLength={12}
                  required
                  onChange={handleChangeInput}
                  className="w-full px-4 py-2 rounded outline outline-1 outline-gray-300/20 bg-gray-300/5"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userInput.password}
                  minLength={4}
                  maxLength={12}
                  required
                  onChange={handleChangeInput}
                  className="w-full px-4 py-2 rounded outline outline-1 outline-gray-300/20 bg-gray-300/5"
                />

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isLoginLoading || isCreateLoading}
                    className={classNames(
                      "flex items-center justify-center flex-1 py-2 transition-all rounded active:scale-95 hover:bg-gray-300/10 text-rose-500 bg-gray-300/5 outline outline-1 outline-gray-300/20",
                      {
                        "cursor-not-allowed": isLoginLoading || isCreateLoading,
                      }
                    )}>
                    {isLoginLoading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Login"
                    )}
                  </button>

                  <button
                    onClick={handleCreate}
                    disabled={isLoginLoading || isCreateLoading}
                    className={classNames(
                      "flex items-center justify-center flex-1 py-2 transition-all rounded active:scale-95 hover:bg-gray-300/10 text-rose-500 bg-gray-300/5 outline outline-1 outline-gray-300/20",
                      {
                        "cursor-not-allowed": isLoginLoading || isCreateLoading,
                      }
                    )}>
                    {isCreateLoading ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full h-full ">
            <div
              ref={chatContainerRef}
              className="relative flex-1 h-full px-6 overflow-y-auto">
              <div className="absolute top-0 left-0 right-0 px-6 py-4">
                {messages.map((item, index) => (
                  <div
                    key={index}
                    className={classNames("flex flex-col gap-1 chat", {
                      "chat-start": item.senderID._id !== user._id,
                      "chat-end": item.senderID._id === user._id,
                    })}>
                    <div className="text-sm opacity-50 ">
                      {item.senderID.username}
                    </div>
                    <div
                      className={classNames(" chat-bubble relative group", {
                        "text-gray-300 bg-gray-300/10":
                          item.senderID._id !== user._id,
                        "bg-rose-500 text-gray-950":
                          item.senderID._id === user._id,
                      })}>
                      {item.message}

                      <p
                        className={classNames(
                          "absolute px-2 py-1 group-hover:block hidden rounded-md text-sm bg-gray-300/90 text-gray-950 -top-8 text-nowrap ",
                          {
                            "left-2/3": item.senderID._id !== user._id,
                            "right-2/3": item.senderID._id === user._id,
                          }
                        )}>
                        <TimeAgo datetime={item.createdAt} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSendMessage}
              className="flex gap-4 px-6 py-4 border-t border-gray-300/10">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                maxLength={50}
                placeholder="Write a message..."
                className="w-full px-4 py-2 rounded-full bg-gray-300/5 outline outline-1 outline-gray-300/20"
              />

              <button
                type="submit"
                className="relative flex items-center justify-center p-4 text-lg rounded-full bg-gray-300/5 hover:bg-gray-300/10 text-rose-500 outline outline-1 outline-gray-300/20">
                {messageCooldown > 0 && (
                  <p className="absolute inset-0 flex items-center justify-center rounded-full text-gray-300/50">
                    {messageCooldown}s
                  </p>
                )}

                <div
                  className={classNames({
                    "opacity-0": messageCooldown > 0,
                    "opacity-100": messageCooldown === 0,
                  })}>
                  <RiSendPlane2Line />
                </div>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatTab;

import React, { useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useChatContext } from "../hooks/useChatContext";
//import vocal:
import { Vocal } from "./chatComponents/Vocal";

export const Chat = ({ ID, filterState, titleToggle, setTitleToggle, selectedTitle }) => {
    const { createTypedChat, isLoading, error } = useChat();
    const [userReq, setUserReq] = useState("");
    const [theTitle, setTheTitle] = useState(null);
    const { chats } = useChatContext();
    const [filteredChats, setFilteredChats] = useState([]);

    const [vocalReq, setVocalReq] = useState(null)

    //title:
    useEffect(() => {
        if (titleToggle) {
            setTheTitle(userReq);
        }
        else if (titleToggle === false && selectedTitle) {
            setTheTitle(selectedTitle);
        }
    }, [titleToggle, userReq, selectedTitle]);

    //chats:
    useEffect(() => {
        const filtered = chats.filter((chat) => chat.id === filterState);
        const reversedFilteredChats = filtered.reverse(); // Reverse the filtered array
        setFilteredChats(reversedFilteredChats);
    }, [chats, filterState]);


    //send vocal to userReq state:
    useEffect(() => {
        setUserReq(vocalReq);
    }, [vocalReq]);


    //req submission:
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userReq && userReq !== "") {
            setTitleToggle(false);
            createTypedChat(userReq, ID, theTitle);
            setUserReq("")
        }
    }

    const reqStyle = {
        padding: "18px",
        margin: "18px",
        borderRadius: "10px",
        textAlign: "end",
        backgroundColor: "#444343",
        fontSize: "18px",
    };

    const resStyle = {
        padding: "18px",
        margin: "18px",
        borderRadius: "10px",
        textAlign: "start",
        backgroundColor: "#444343",
        fontSize: "large",
        fontWeight: "bold",
    };

    return (
        <div className="chats-container">

            <header>
                <h1>BdevGPT</h1>
                {error && <p>Error: {error}</p>}
            </header>
            <div className="chats">
                {filteredChats.length > 0 && (
                    <ul>
                        {filteredChats.map((chat, i) => (
                            <div key={i}>
                                {/* <li>{chat.title}</li> */}
                                <li>
                                    <div style={chat.role === "user" ? reqStyle : resStyle}>
                                        {chat.msg && <p>{chat.msg}</p>}
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                )}
            </div>

            <div className="request">
                <div className="vocal">
                    <Vocal setVocalReq={setVocalReq} />
                </div>
                <div className="form-container">

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="request"
                            placeholder="Send a message"
                            onChange={(e) => setUserReq(e.target.value)}
                            value={userReq}
                        />

                        <div className="btn-submit-container">
                            {isLoading ?
                                <p className="loading-submit">loading...</p>
                                :
                                <button
                                    className="btn-submit"
                                    // style={isLoading ? { backgroundColor: "red" } : {}}
                                    // disabled={isLoading}
                                    type="submit"
                                >
                                    <p>➤</p>
                                </button>
                            }
                        </div>
                    </form>

                </div>


            </div>
        </div>
    );
};
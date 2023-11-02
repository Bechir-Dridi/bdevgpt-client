import React, { useState } from "react"
import "../index.css"
//context hook:
import { useChatContext } from "../hooks/useChatContext"


export const Navbar = ({ setID, setFilterState, setTitleToggle, setSelectedTitle }) => {
    //context:
    const { chats } = useChatContext()
    //track selected list item:
    const [selected, setSelected] = useState(null)

    //create ID:
    const create_ID = (chats) => {
        const chatsLen = chats.length
        let _id = chatsLen
        //Math.floor(Math.random() * 100000)

        return _id
    }


    //new btn handler:
    const handleSubmit = () => {
        const createdID = create_ID(chats)
        setID(createdID)
        setFilterState(createdID)

        setTitleToggle(true)

        setSelected(createdID)
    }


    const filterHandler = (id, title) => {
        console.log("filter:", id)
        setFilterState(id)
        setID(id)
        setSelectedTitle(title)
    }

    //create titles List:
    const newTitles = [];
    for (let i = 0; i < chats.length; i++) {
        const chat = chats[i];

        let unique = true;
        for (let j = 0; j < newTitles.length; j++) {
            if (newTitles[j].id === chat.id) {
                unique = false;
                break; // No need to continue checking
            }
        }

        if (unique) {
            newTitles.push({ title: chat.title, id: chat.id });
        }
    }
    //console.log("newTitles:", newTitles);

    const selectedStyle = {
        color: "white",
        fontWeight: "bold", // Bold text
        outline: "1px solid #fff", // Red outline
    }
    //console.log("selected title:", selected);


    return (
        <div className="navbar-container">
            <div className="new-container">
                <button onClick={handleSubmit}>New</button>
            </div>
            <div className="titles">
                {newTitles &&
                    <ul>
                        {
                            newTitles.map((newTitle, i) =>
                                <div key={i} >

                                    <li style={selected === newTitle.id ? selectedStyle : {}}
                                        onClick={() => {
                                            filterHandler(newTitle.id, newTitle.title)
                                            setSelected(newTitle.id)
                                        }}
                                    >
                                        {newTitle.title}
                                    </li>

                                </div>
                            )
                        }
                    </ul>
                }
            </div>

            <div className="footer">
                {/* <p>bdev</p> */}
                <p>developed by</p>
                <a href="https://bechirdev.netlify.app" target="_blank"> <p>bdev.netlify.app</p></a>

            </div>
        </div>
    )

}
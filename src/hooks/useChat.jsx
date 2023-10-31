import React, { useState } from "react";
//context hook:
import { useChatContext } from "../hooks/useChatContext"



export function useChat() {

    //set the error and loading states:
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    //context:
    const { dispatch } = useChatContext()
    //const {  prevChats: chats } = useChatContext()
    //console.log("prevChats:", prevChats);


    //2.dispatch chat:
    function dispatchChat(req, ID, theTitle, resMsg) {

        //create TITLE:
        const createTitle = (str) => {
            if (str) {

                let title = ""
                for (let i = 0; i < str.length; i++) {
                    if (i < 20) {
                        title += str[i]
                    }

                }

                return title
            }
        }
        const createdTitle = createTitle(theTitle)


        //send msg:
        const request =
        {
            id: ID,
            title: createdTitle,
            role: "user",
            msg: req,
        }
        const response =
        {
            id: ID,
            title: createdTitle,
            role: "assistant",
            msg: resMsg,
            //msg: JSON.stringify(resMsg),
        }



        console.log("MSG:", request, response);
        dispatch({ type: 'create_chat', payload: request })
        dispatch({ type: 'create_chat', payload: response })
    }


    const createChat = async (myReq, myID, myTitle) => {
        setIsLoading(true)
        setError(null)

        //1.post req: 
        const response = await fetch("https://bdevgpt-server.onrender.com/api/chats", {
            //const response = await fetch("http://localhost:8000/api/chats", {
            method: "POST",
            headers: { "Content-Type": 'application/json', },
            body: JSON.stringify({ msg: myReq })
            //body: JSON.stringify({ msg: [req, ...chats] })
        })
        const json = await response.json()
        console.log("json:", json)
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            //send chat:
            if (json.error) { return setError(json.error) }

            const myJson = json.choices[0].message.content
            dispatchChat(myReq, myID, myTitle, myJson)

            setIsLoading(false)
            setError(null)

        }
    }



    //0.create the create_chat fct:
    const createTypedChat = (req, ID, theTitle) => {

        const myReq = req;
        const myID = ID;
        const myTitle = theTitle;

        createChat(myReq, myID, myTitle)
    }


    return { createTypedChat, isLoading, error }
}


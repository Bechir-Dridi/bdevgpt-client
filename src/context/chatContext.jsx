import React, { useReducer, createContext } from 'react';

export const chatContext = createContext();

//req:
const chatReducer = (state, action) => {
    switch (action.type) {
        case "create_chat": return { chats: [action.payload, ...state.chats] }

        default: return state
    }
}


export const ChatContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(chatReducer, { chats: [] })

    console.log("context resquestState", state);


    return (
        <chatContext.Provider value={{
            ...state, dispatch,
        }}>
            {children}
        </chatContext.Provider>
    );


}
export default ChatContextProvider
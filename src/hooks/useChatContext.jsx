import { useContext } from "react"
import { chatContext } from "../context/chatContext"

export const useChatContext = () => {
    const context = useContext(chatContext)
    if (!context) {
        throw Error("useWorkoutContext must be used inside WorkoutsContextProvider")
    }
    return context
}
// developed by "Bechir Dridi"
// Portfolio: https://bechirdev.netlify.app
// twitter:   https://twitter.com/bechir7dridi
// linkedin:  https://linkedin.com/in/bechir-dev/
// github:    https://github.com/Bechir-Dridi
import React, { useState } from "react"
import './index.css'
//import components:
import { Navbar } from './components/Navbar'
import { Chat } from './components/Chat'


function App() {
  const [ID, setID] = useState(0)
  const [filterState, setFilterState] = useState(0)
  const [titleToggle, setTitleToggle] = useState(true)
  const [selectedTitle, setSelectedTitle] = useState(null)


  return (
    <div className="app-container">

      <div className='navbar-container'>
        <Navbar
          setID={setID}
          setFilterState={setFilterState}
          setTitleToggle={setTitleToggle}
          setSelectedTitle={setSelectedTitle}
        />
      </div>

      <div className="chat-container">
        <Chat
          ID={ID}
          filterState={filterState}
          titleToggle={titleToggle}
          setTitleToggle={setTitleToggle} //to reset
          selectedTitle={selectedTitle}
        />
      </div>

    </div>

  )
}

export default App

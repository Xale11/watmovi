import React, { createContext, useContext, useState } from 'react'
  
const ContextAPI = createContext()

const Context = ({children}) => {
    

    const [currentMovie, setCurrentMovie] = useState()
    const [theme, setTheme] = useState(1)
    const [show, setShow] = useState(false)

  return (
    <ContextAPI.Provider value={{currentMovie, setCurrentMovie, theme, setTheme, show, setShow}}>
        {children}
    </ContextAPI.Provider>
  )
}

export const useStateContext = () => useContext(ContextAPI)

export default Context
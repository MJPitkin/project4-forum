import React from "react";
import userService from "../utils/userService.js"

const initialState = {
    user: {},
}

export const UserContext = React.createContext(initialState);

export const UserProvider = ({ children }) => {
    const [state, setState] = React.useState(initialState)
    React.useEffect(() => {
        async function getUserFromToken() {
            const user = await userService.getToken()
            setState({ ...state, user })
        }
        getUserFromToken()
    }, [])
    return (
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    )
}
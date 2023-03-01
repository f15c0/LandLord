import { createContext } from "react";

export const UserContext= createContext();

const UserContextProvider = ({children}) => {
    return ( 
        <UserContext.Provider  value={"Max Payne!"}>
            {children}
        </UserContext.Provider>
     );
}
 
export default UserContextProvider;
import { createContext, useEffect, useState } from "react";
import axios from "axios";



export const userContext=createContext();

export default function UserContextProvider(props){

   
    async function fetchData2() {
        try {
            const {data}=await axios.get("http://localhost:3000/users/userdata");
            
            // console.log(data);
            


            
            setUserData(data.userdata);

            
            

        } catch (error) {
            console.log(error.message);

            
            
        }
      
    }
    const [loggedIn,setLoggedIn]=useState(false);

    const [userData,setUserData]=useState(false);

    axios.defaults.withCredentials=true;


    
    

    const value={
        loggedIn,setLoggedIn,
        userData,fetchData2
        
    }

    return (
        <userContext.Provider value={value}>
                {props.children}
        </userContext.Provider>    )

}


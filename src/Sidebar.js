import React from "react";
import './Sidebar.css';
import './App.css';
// import App from './App';
// import {Avatar} from '@material-ui/core';
// import { Avatar  } from '@mui/material'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Avatar } from "@mui/material";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from "@mui/material";
import { Switch } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import db from './firebase';
import { useState, useEffect } from "react";
import Chat from './Chat';
import { useStateValue } from "./StateProvider";
import { createContext } from 'react';
// import App from "./App";
// import { toggleTheme } from "./App";
export const ThemeContext = createContext(null);
function Sidebar() {
    const [{ user }, dispatch] = useStateValue();
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))

            )
        );
        return () => {
            unsubscribe();
        }
    }, [])
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="sidebar" id={theme}>
                <div className="sidebar__header">
                    <Avatar src={user?.photoURL} />
                    <div className="header__right">
                        <Switch onChange={toggleTheme} checked={theme === "dark"} />
                        <IconButton>

                            <DonutLargeIcon />
                        </IconButton>
                        <IconButton>
                            <ChatIcon />
                        </IconButton>
                        <IconButton>


                            <MoreVertIcon />
                        </IconButton>

                    </div>
                </div>
                <div className="sidebar__search">
                    <div className="search__main">
                        <SearchIcon />
                        <input type="text" placeholder="Search or start a new chat"></input>
                    </div>
                </div>
                <div className="sidebar__chats">
                    <Chat addNewChat />
                    {rooms.map((room => (
                        <Chat key={room.id} id={room.id} name={room.data.name} />
                    )))}

                </div>


            </div>
        </ThemeContext.Provider>
    )
}
export default Sidebar
// export {theme}
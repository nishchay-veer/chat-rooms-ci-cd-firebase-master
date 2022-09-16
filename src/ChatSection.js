import React, { useEffect, useState, useRef } from "react";
import './ChatSection.css';
import { Avatar, IconButton } from "@mui/material";
import Search from "@mui/icons-material/Search";
import EmojiPicker from "emoji-picker-react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import db from './firebase';
import { useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useStateValue } from "./StateProvider";
function ChatSection() {
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    // const[showEmojis, setShowEmojis] = useState();

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const [{ user }, dispatch] = useStateValue();
    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
                .onSnapshot(snapshot => (
                    setRoomName(snapshot.data().name)
                ));

            db.collection("rooms").doc(roomId).collection("messages")
                .orderBy("timestamp", 'asc').onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data())));

        }
    }, [roomId])
    useEffect(() => {
        (setSeed(Math.floor(Math.random() * 5000)))

    }, [roomId])
    // const handleShowEmojis = ()=>{
    //     inputRef.current.focus()
    //     setShowEmojis(!showEmojis);
    // }
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInput(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };
    const sendMessage = (e) => {
        e.preventDefault();
        if (input !== "") {
            db.collection('rooms').doc(roomId).collection('messages').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setInput("");

        }

    }
    // useEffect(() => {
    //     if (messageEl) {
    //       messageEl.current.addEventListener('DOMNodeInserted', event => {
    //         const { currentTarget: target } = event;
    //         target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    //       });
    //     }
    //   }, [])
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);
    return (
        <div className="chatSection">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`} />
                <div className="chat__headerinfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="header__right">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <div className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>

                    </div>

                ))}
                <div ref={messagesEndRef} />



            </div>
            <div className="chat__footer">

                <InsertEmoticonIcon onClick={() => setShowPicker(val => !val)} />

                <form>
                    <input type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type a message" />
                    <button type="submit" onClick={sendMessage}></button>
                </form>
                {showPicker && <EmojiPicker
                        pickerStyle={{ width: '100%' }}
                        onEmojiClick={onEmojiClick} />}
                <div className="chat__footerIcons">
                    <MicIcon />

                </div>



            </div>

        </div>
    )
}
export default ChatSection
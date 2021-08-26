import React, { useState, useEffect } from 'react';
import "./Chat.css";
import { database } from './firebase';
import SideBar from './SideBar';
import {useSelector} from "react-redux";
import {selectUser} from './features/userReducer';
import {selectChatId} from './features/chatReducer';
import Message from './message';
import firebase from 'firebase';
import { Avatar} from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

function Chat() {
  const user = useSelector(selectUser)
  const [matches, setMatches] = useState([]);
  const [userData, setUserData] = useState([]);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);
  const [inputMes, setInputMes] = useState('');
  const [chatPerson, setChatPerson] = useState([]);

  const isInvalid = inputMes === '';

  const getUser = () => {
    database
      .collection('people')
      .doc(user.uid)
      .get()
      .then((document) => {
        setUserData(document.data());
      })
    }
  
  useEffect(async() => {
    await getUser();
    get()
    }, [userData]);

  const get = () => {
    database
      .collection('chats')
      .where("user", "array-contains", {id: user.uid, name: user.displayName, url: userData.url? userData.url:''})
      .onSnapshot((snapshot) => {
        setMatches(snapshot.docs.map((doc) => 
          ({id: doc.id,
          match: doc.data()})
        ))
      });
  };


  useEffect(() => {
    if (chatId) {
      database
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          })
        ))
      });
      database
        .collection('chats')
        .doc(chatId)
        .get()
        .then(async(doc) => {
          const result = doc.data();
          if (result.user[0].id !== user.uid) {
            const chatPersonId = await result.user[0].id;
            database
              .collection('people')
              .doc(chatPersonId)
              .get()
              .then((doc) => {
                setChatPerson(doc.data())
                console.log(chatPerson)
          })
          } else {
            const chatPersonId = await result.user[1].id
            database
              .collection('people')
              .doc(chatPersonId)
              .get()
              .then((doc) => {
                setChatPerson(doc.data())
                console.log(chatPerson)
              })
          }}
        );
  }}, [chatId])


    const sendMessage = (event) => {
      event.preventDefault();
      database
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          message: inputMes,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          url: userData.url,
          name: user.displayName
        });
      setInputMes('')
    }

    return (
      <div className="chat_page">
        <div className="chat_bar">
          {
            matches.map(({id, match})  => (
              <SideBar 
                id={id}
                url={match.user[0].url !== userData.url? match.user[0].url : match.user[1].url}
                name={match.user[0].name !== user.displayName? match.user[0].name : match.user[1].name}
                />
            ))
          }
        </div>



        <div className="chat_display_container">
          <div className="chat_display">
                      {
            messages.map(({id, data}) => 
                <Message content={data} id={id}/>
            )
          }
          </div>
          <div className="chat_input_container">
            <input onChange={(e) => setInputMes(e.target.value)} className="chat_input" value={inputMes} placeholder="Enter message..." />
            <button disabled={isInvalid} className="chat_button" onClick={sendMessage}>Send Message</button>
          </div>
        </div>
      
        <div className="chat_card">
          {chatPerson? 
            <div className="profile_img"> 
              <Avatar className="img" src={chatPerson.url}/>
              <div className="card_name">
                <p className="card_text">{chatPerson.fname}</p>
                <p className="card_age">{chatPerson.age}</p>
              </div>
              <div className="card_name2">
                <PersonOutlineIcon className="icon_card" fontSize="small"></PersonOutlineIcon>
                <p>{chatPerson.gender}</p>
              </div>
            </div>
          : ''}          
        </div>
      </div>
    )
  }
  
  export default Chat;
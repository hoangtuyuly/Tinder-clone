import React, { useState, useEffect } from 'react';
import {useStateValue} from "./StateProvider";
import "./Chat.css";
import { Input } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { database } from './firebase';
import SideBar from './SideBar';

function Chat() {
  const [{user}, dispatch] = useStateValue();
  const [input, setInput] = useState('');
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState([]);

  
  useEffect(() => {
    database
      .collection('people')
      .doc(user.uid)
      .collection('matches')
      .where('ismatch', '==', true)
      .onSnapshot((snapshot) => {
        setMatches(snapshot.docs.map((doc) => 
          ({id: doc.id,
          match: doc.data()})
        ))
      });
  }, []);

  
    const sendMessage = () => {
      console.log(matches)
    }

    return (
      <div className="chat_page">
        <div className="chat_bar">
          {
            matches.map(({id, match})  => (
              <SideBar url={match.url} name={match.name}/>
            ))
          }
        </div>



        <div className="chat_display_container">
          <div className="chat_display">
          </div>
          <div className="chat_input_container">
            <Input className="chat_input" value={input} placeholder="Enter message..." onChange={(e) => setInput(e.target.value)}/>
            <Button onClick={sendMessage}>Send Message</Button>
          </div>
        </div>

        <div className="chat_card">
          <p>Hi</p>
        </div>
      </div>
    )
  }
  
  export default Chat;
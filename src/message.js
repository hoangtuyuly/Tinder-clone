import React, { useEffect, useState } from "react";
import {Avatar} from '@material-ui/core';
import './message.css';
import {useSelector} from "react-redux";
import {selectUser} from './features/userReducer';


function Message({id, content: {timestamp, message, url, name}}) {
  const user = useSelector(selectUser)
  return (
    <div className="message_containner">
    <div className={`message ${user.displayName === name && "message_sender"}`} >
        <Avatar src={url} className="avatar_chat"/>
        <p>{message}</p>
        <small className="small">{new Date(timestamp?.toDate()).toLocaleString()}</small>
    </div>
    </div>
  );
}

export default Message;

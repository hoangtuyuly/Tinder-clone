import { Avatar} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import {setChat} from './features/chatReducer';
import './sideBar.css'

function SideBar({id, url, name}) {
  const dispatch = useDispatch();
  return (
    <div className="sideBar"
    onClick={() => {
      dispatch(
        setChat({
          chatId: id
        })
      )
    }}>
        <Avatar className = "avatar" src={url}/>
        <p className = "name">{name}</p>
    </div>
  );
}

export default SideBar;

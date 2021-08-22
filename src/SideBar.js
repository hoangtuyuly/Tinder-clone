import { Avatar, ListItemAvatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './sideBar.css'

function SideBar({id, url, name}) {

  return (
    <div className="sideBar">
        <Avatar className = "avatar" src={url}/>
        <p className = "name">{name}</p>
    </div>
  );
}

export default SideBar;

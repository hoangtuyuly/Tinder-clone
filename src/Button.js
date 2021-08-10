import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import './Button.css'

function ButtonSwipe() {
    return (
      <div className="button_swipe">
        <IconButton>
          <ReplayIcon className="replay_icon" fontSize="large"/>
        </IconButton>
        <IconButton>
          <CloseIcon className="close_icon" fontSize="large"/>
        </IconButton>
        <IconButton>
          <StarRateIcon className="star_icon" fontSize="large"/>
        </IconButton>
        <IconButton>
          <FavoriteIcon className="favorite_icon" fontSize="large"/>
        </IconButton>
        <IconButton>
          <FlashOnIcon className="flash_icon" fontSize="large"/>
        </IconButton>
      </div>
    );
  }
  
  export default ButtonSwipe;
  
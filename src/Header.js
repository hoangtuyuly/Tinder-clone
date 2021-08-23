import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';
import './Header.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory, Link } from "react-router-dom";

function Header({ backButton }) {
    let  history = useHistory();

    return (
      <div className="header">

        {backButton ? (
          <IconButton onClick={() => history.replace(backButton)}>
            <ArrowBackIosIcon className="header_icon" fontSize="large"/>
          </IconButton>
        ) : (
          <Link to="/profile" >
            <IconButton>
              <PersonIcon className="header_icon" fontSize="large"/>
            </IconButton>
          </Link>
        )}

        <Link to="/main" >
          <img className="header_logo"
            src="https://logos-world.net/wp-content/uploads/2020/09/Tinder-Emblem.png"
            alt="Logo"></img>
        </Link>

        <Link to="/chat">
          <IconButton>
            <ForumIcon className="header_icon" fontSize="large"/>
          </IconButton>
        </Link>
      </div>
    );
  }
  
  export default Header;
  
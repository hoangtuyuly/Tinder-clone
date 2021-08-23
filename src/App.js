import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import TinderCards from './TinderCard.js';
import ButtonSwipe from './Button'
import Chat from './Chat'
import SignUp from './signup';
import SignIn from './signin'
import Profile from './profile';
import Update from './profileUpdate';
import {useSelector, useDispatch} from "react-redux";
import {selectUser, login, logout} from './features/userReducer';
import { useEffect } from 'react';
import { auth } from "./firebase"

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>

          <Route exact path="/">
            <Redirect to="/signin" />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

        {user?
          <Route path="/chat">
            <Header backButton="/main"/>
            <Chat />
          </Route>       
        :''}

        {user?
          <Route path="/profile">
            <Profile />
          </Route>        
        :''}

        {user?
          <Route path="/profile_update">
            <Update />
          </Route>
        :''}

        {user?
          <Route path="/main">
            <Header />
            <TinderCards />
            <ButtonSwipe />
          </Route>
        : ''}
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;

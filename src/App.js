import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TinderCards from './TinderCard.js';
import ButtonSwipe from './Button'
import Chat from './Chat'
import SignUp from './signup';
import SignIn from './signin'
import Profile from './profile';
import Update from './profileUpdate';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat">
            <Header backButton="/"/>
            <Chat />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/profile_update">
            <Update />
          </Route>
          
          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/">
            <Header />
            <TinderCards />
            <ButtonSwipe />

          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

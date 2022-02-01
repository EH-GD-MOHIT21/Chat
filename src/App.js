import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ForgotPass from './components/ForgotPass';
import PassChanger from './components/PassChanger';
import Chat from './components/Chat';
import ChatPage from './components/ChatPage';
import PrivateChatRoom from './components/PrivateChatRoom';
import PrivateChat from './components/PrivateChat';

function App() {

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  return (
    <Router>
      <Switch>
        <Route path="/about">
          <HomePage />
        </Route>
        <Route path="/users">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/forgotpass">
          <ForgotPass />
        </Route>
        <Route exact path="/chat">
          <Chat getCookie={getCookie}/>
        </Route>

        <Route exact path="/privatechat">
          <PrivateChat getCookie={getCookie}/>
        </Route>

        <Route path="/validate/user=:user/token=:token">
          <PassChanger />
        </Route>
        <Route path="/chat/private/:roomname">
          <PrivateChatRoom getCookie={getCookie}/>
        </Route>
        <Route path="/chat/:roomname">
          <ChatPage getCookie={getCookie}/>
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

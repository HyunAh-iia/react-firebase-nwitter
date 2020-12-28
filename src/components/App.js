import React, {useState} from 'react';
import Router from "components/Router";
import {authService} from "myFirebase"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!authService.currentUser);
  return <Router isLoggedIn={isLoggedIn} />;
}

export default App;

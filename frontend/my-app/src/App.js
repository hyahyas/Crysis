import React from 'react';
import './App.css';
import Login from './components/Login/login';
import SignUp from './components/SignUp/signup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Replace the default content with the login and sign up components */}
        <Login/>
        {/* <SignUp/> */}
      </header>
    </div>
  );
}

export default App;

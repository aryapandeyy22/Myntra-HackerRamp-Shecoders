import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from "./Components/LoginSignup.js"
import Profile from './Components/Profile.js';
import EditProfile from './Components/EditProfile.js';
import PaymentOptions from './Components/PaymentOptions.js';
import CreateCrowdProfile from './Components/CreateCrowdProfile.js';
import './App.css';

function App() {
  return (
    //<PhoneProvider>
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginSignup />}></Route>
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" exact element={<LoginSignup />} />
          <Route path='/pay' element={<PaymentOptions />}></Route>
          <Route path='/crowdprofile' element={<CreateCrowdProfile/>}></Route>
        </Routes>
      </div>
    </Router>
    //</PhoneProvider>
  );
}

export default App;

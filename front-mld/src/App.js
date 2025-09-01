import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home/Home';
import Clien from './clean/Clien';
import Contact from './contact/Contact';
import Why from './why/Why';
import Upcoming from './upcoming/Upcoming';
import User from './user/UserM';
import Appointments from './appointments/Appointments';
import Dashboard from './dashboard/Dashboard';
import Cleaners from './cleaners/Cleaners' ;
import Vr from './home/VR';

function App() {
  const token = localStorage.getItem('token'); // Check if the user is logged in
  const email = localStorage.getItem('email');
    const isAdmin = token && email === 'ammarisaad343@gmail.com';


  return (
    <div className="App">
      
      <Router>
        <Routes >
          <Route path="/" element={<Home />} />
                  <Route path="/verify/:token" element={<Vr />} />
          <Route path="/clien" element={token ? <Clien /> : <Navigate to="/" />}  />
          <Route path="/Upcoming" element={token ? <Upcoming /> : <Navigate to="/" />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/why" element={<Why />} />
        </Routes>
        <Routes>
      <Route path='/cleaners' element={isAdmin?<Cleaners/>:<Navigate to="/"/>}/>

      
      <Route path="/user" element={isAdmin ? <User /> : <Navigate to="/" />} />
      <Route path="/Apoin" element={isAdmin ? <Appointments /> : <Navigate to="/" />} />
      <Route path="/dashboard" element={isAdmin ? <Dashboard /> : <Navigate to="/" />} />

    </Routes>
      </Router>
    </div>
  );
}

export default App;

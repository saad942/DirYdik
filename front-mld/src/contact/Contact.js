import React, { useState } from "react";
import axios from 'axios';
import './contact.css';
import Nav from '../nav/Nav';

function Contact() {
  const [about, setAbout] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); 
  
  const send = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/user/contact', {
        about, name, phone, email, message
      });
      
      if (response.data.status === 'success') {
        setStatus('Message sent successfully!');
        setAbout('');
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('Something went wrong, please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    }
  };

  const isFormValid = name && phone && email && message && about; // Basic form validation
  
  return (
    <><Nav/>
    <div className="container">
      <strong className="titlee">Get in touch with us</strong><br />
      <strong className="ntitle">How can we take care of you?</strong>
      <p className="pa">Send us a message, or get in touch with us at any of our locations.</p>

      <div className="form">
        <label>How can we help you?</label><br />
        <select value={about} onChange={(e) => setAbout(e.target.value)}>
          <option value="">Select</option>
          <option value="I have a Question">I have a Question</option>
          <option value="I have feedback">I have feedback</option>
          <option value="I am interested in a career">I am interested in a career</option>
        </select>

        <label>About You</label><br />
        <input 
          type="text" 
          required 
          placeholder="Your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text" 
          required 
          placeholder="Your phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)}
        />
        <input 
          type="email" 
          required 
          placeholder="Your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea 
          onChange={(e) => setMessage(e.target.value)} 
          value={message}
          id="message"
          placeholder="Write your message here..."
          required
          className="message-textarea"
        />

        <button onClick={send} disabled={!isFormValid}>Send Message</button>
        
        {/* Show status message */}
        {status && <p className="status-message">{status}</p>}
      </div>
    </div></>
  );
}

export default Contact;

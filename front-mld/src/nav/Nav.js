import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';import './Nav.css';  // Custom CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const token = localStorage.getItem('token');
  const [showModal, setShowModal] = useState(false);
  const [create, setCreate] = useState(false);
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const response = await axios.post('http://localhost:3002/user/register', {
        email: email
      });

      console.log('Response:', response.data);

      if (response.data.message === 'User created successfully, please check your email for verification link.') {
        setMsg('Please confirm your email and log in.');
        setCreate(false)
      } else {
        setMsg('Something went wrong. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setMsg(`Error: ${error.response.data.message || 'An error occurred. Please try again later.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3002/user/login', { email: email });
      const token = response.data.token;
      const userInfo = response.data.userInfo;
      localStorage.setItem('token', token);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('userId', JSON.stringify(userInfo));
      window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setMsg(`Error: ${error.response.data.message}`);
      } else {
        setMsg('An error occurred. Please check your email or try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">DirYdik</a>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto" style={{ marginLeft: '50px' }}>
              <li className="nav-item">
                <a className="nav-link" href="#">Our services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/why">Why DirYdik</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
              {token && (
                <li className="nav-item">
                  <a href="/Upcoming">
                    <img 
                      src="/images/clen.png" 
                      className="profile-image" 
                      alt="Upcoming" 
                    />
                  </a>
                </li>
              )}
            </ul>
            
            {/* Right side items - moved inside collapse for better mobile experience */}
            <div className="d-flex align-items-center">
              <a 
                href="tel:+212775931054" 
                className="phone-icon"
              >
                <FontAwesomeIcon icon={faPhone} />
              </a>

              {!token ? (
                <button
                  className="action-button"
                  onClick={handleShowModal}
                >
                  Create account
                </button>
              ) : (
                <button className="action-button">
                  <a href='/clien' style={{ textDecoration: 'none', color: 'white' }}>
                    Instant Quote
                  </a>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{create ? 'Create account' : 'Login'}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: 'white' }}>
          {msg && (
            <div className="error-message" style={{ marginBottom: '15px' }}>
              {msg}
            </div>
          )}
          
          {loading && (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
              <span style={{ marginLeft: '10px' }}>Please wait...</span>
            </div>
          )}
          
          <form onSubmit={create ? handleUser : handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Gmail:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="form-control"
                type="email"
                placeholder="Enter your Gmail"
                required
              />
            </div>

            <p>
              {create ? 'If you have an account, ' : 'If you want to create an account, '}
              <a 
                href="#!" 
                onClick={(e) => {
                  e.preventDefault();
                  setCreate(!create);
                  setMsg('');
                }}
              >
                click here
              </a>
            </p>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100" 
              disabled={loading}
            >
              {create ? 'Create Account' : 'Login'}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
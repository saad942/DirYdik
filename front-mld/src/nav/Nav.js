import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; import './Nav.css';  // Custom CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem('token');
  const [showModal, setShowModal] = useState(false);
  const [create, setCreate] = useState(false);
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
const navigate = useNavigate();
 const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    navigate("/");
  }
  const handleUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const response = await axios.post('/user/register', {
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
      const response = await axios.post('/user/login', { email: email });
      const token = response.data.token;
      const userInfo = response.data.userInfo;
      localStorage.setItem('token', token);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('userId', JSON.stringify(userInfo));
      navigate("/");
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
          <Link className="navbar-brand" to="/">DirYdik</Link>

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
            <ul className="navbar-nav me-auto ms-5">
              <li className="nav-item">
                <button className="nav-link">
                  Our services
                </button>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/why">Why DirYdik</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>

              {token && (
                <li className="nav-item">
                  <Link to="/Upcoming">
                    <img
                      src="/images/clen.png"
                      className="profile-image"
                      alt="Upcoming"
                    />
                  </Link>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center">
              <div
                className="phone-icon"
                onClick={() => window.location.href = "tel:+212775931054"}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={faPhone} />
              </div>


              {!token ? (
                <button className="action-button" onClick={() => setShowModal(true)}>
                  Create account
                </button>
              ) : (
                 <>
                  <button
                    className="action-button"
                    onClick={() => navigate("/clien")}
                  >
                    Instant Quote
                  </button>
                  <button 
                    className="action-button ms-2"
                    onClick={handleLogout}
                  >
                    lougout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{create ? "Create account" : "Login"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {msg && <div className="error-message mb-3">{msg}</div>}

          {loading && (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" />
            </div>
          )}

          <form onSubmit={create ? handleUser : handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Gmail:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                type="email"
                required
              />
            </div>

            <p>
              {create ? "If you have an account, " : "If you want to create an account, "}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => {
                  setCreate(!create);
                  setMsg("");
                }}
              >
                click here
              </button>
            </p>

            <Button type="submit" className="w-100" disabled={loading}>
              {create ? "Create Account" : "Login"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
import React from 'react';
import Nav from '../nav/Nav';

import './Home.css'; // Your custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheckCircle, faUserFriends, faHandsWash, faClipboardCheck, faBroom, faTshirt } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <>
      <Nav />

      <div className="cont">
        {/* Video Background */}
        <div className="video-wrapper">
          <video
            src="/images/istockphoto-1266094531-640_adpp_is.mp4"
            autoPlay
            loop
            muted
            className="background-video"
          />
        </div>

        {/* Hero Section */}
        <div className="hero-content">
          <div className="Home">
            <h1>CLEAN YOUR HOUSE</h1>
            <p>You just come home, smile, and relax.</p>
            <button className="btn">See how it works</button>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="how-it-works py-5">
          <h1>How It Works</h1>

          <div className="how-cards">
            <div className="how-card">
              <FontAwesomeIcon icon={faClipboardCheck} size="2x" className="how-icon" />
              <h2>Instant quote</h2>
              <p>Tell us about your home and choose the date you want.</p>
            </div>

            <div className="how-card">
              <FontAwesomeIcon icon={faBroom} size="2x" className="how-icon" />
              <h2>Enjoy your spotless space</h2>
              <p>Our seasoned team of full-time cleaners will transform your home.</p>
            </div>

            <div className="how-card">
              <FontAwesomeIcon icon={faTshirt} size="2x" className="how-icon" />
              <h2>Let us help with laundry</h2>
              <p>House? Sparkling. Laundry? Done. You? Relaxed.</p>
            </div>
          </div>
        </section>

        {/* Why DirYdik Section */}
        <div className="con">
          <div className="text">
            <strong>Why DirYdik?</strong>

            <div className="feature">
              <FontAwesomeIcon icon={faCheckCircle} className="icon animated-icon" />
              <div>
                <h3>We never cancel. Ever.</h3>
                <p>We show up, every time. If we ever do cancel, we'll pay you $100. Guaranteed.</p>
              </div>
            </div>

            <div className="feature">
              <FontAwesomeIcon icon={faUserFriends} className="icon animated-icon" />
              <div>
                <h3>A team you can trust.</h3>
                <p>Our trained professional housekeepers are licensed and insured.</p>
              </div>
            </div>

            <div className="feature">
              <FontAwesomeIcon icon={faHandsWash} className="icon animated-icon" />
              <div>
                <h3>A higher standard of clean.</h3>
                <p>Our quality control inspectors follow up to ensure the team has met our sparkling standards.</p>
              </div>
            </div>
          </div>

          <div className="images">
            <img src="/images/img1.jpg" alt="First" className="styled-image" />
            <img src="/images/img2.jpeg" alt="Second" className="styled-image" />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reac">
          <strong className="stron">Austinites Love DirYdik!</strong>
          <h3 className="h3">
            For nearly 25 years, we've helped busy Texans make home a clean, relaxing refuge.
          </h3>

          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} />
            ))}
          </div>

          <button className="quote-button">
            <a href="/clien">Instant Quote</a>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;

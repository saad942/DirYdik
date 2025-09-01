import React from "react";
import Nav from '../nav/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faComment, faDollarSign, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import './Why.css'
function Why() {
    return (
        <div>
            <Nav/>
            <div style={styles.con}><br/><br/><br/><br/><br/><br/>
               <div style={styles.hh}><strong style={{fontSize:'40px'}}>Our Mission                </strong></div> 
                
                <div className="row" style={styles.row}>
                    <div className="col" style={{ ...styles.col, marginLeft: '60px' }}>
                     
                    <FontAwesomeIcon icon={faDollarSign} size="2x" /> 
                        <h1 style={styles.headin}>Industry-Leading Wages</h1>
                        <p style={styles.paragraph}>
                            Our staff are full-time, W2 employees that are the highest-paid
                            housekeepers in Austin, with wages ranging from $19-28 an hour,
                            reflecting our recognition of their hard work and dedication.
                        </p>
                    </div>

                    <div className="col" style={{...styles.col, marginLeft: '60px'}}>
                    <FontAwesomeIcon icon={faHandsHelping} size="2x" /> 
                        <h1 style={styles.headin}>Supporting Working Mothers        </h1>
                        <p style={styles.paragraph}>
                            We understand the dual responsibilities of work and family. Our
                            scheduling ensures almost all our staff, many of whom are mothers,
                            can finish their workday by 3 pm for family time.

                        </p>
                    </div>
                </div>

                <div className="row" style={styles.row}>
                    <div className="col" style={{ ...styles.col, marginLeft: '60px' }}>
                    <FontAwesomeIcon icon={faSmile} size="2x" />
                        <h1 style={styles.headin}>Comprehensive Health Benefits                        </h1>
                        <p style={styles.paragraph}>
                        We understand the dual responsibilities of work and family. Our
                            scheduling ensures almost all our staff, many of whom are mothers,
                            can finish their workday by 3 pm for family time.

                        </p>
                    </div>

                    {/* Fourth column with col-8 */}
                    <div className="col" style={{ ...styles.col, marginLeft: '60px' }}>
                    <FontAwesomeIcon icon={faComment} size="2x" /> 
                        <h1 style={styles.headin}>Educational Scholarships    </h1>
                        <p style={styles.paragraph}>
                        We understand the dual responsibilities of work and family. Our
                            scheduling ensures almost all our staff, many of whom are mothers,
                            can finish their workday by 3 pm for family time.

                        </p>
                    </div>
                </div>

            </div>

            <div style={styles.container}>
                <div style={styles.textContainer}>
                    <h2 style={styles.heading}>The MoreHands Family</h2>
                    <p style={styles.text}>
                        As a family business, we take care of each other, our employees, and you.
                        And then everyone gets to go home, happy.
                    </p>
                </div>
                <div style={styles.videoContainer}>
                    <video
                        src="/images/House Cleaning.mp4"
                        autoPlay
                        loop
                        muted
                        style={styles.video}
                        aria-label="House Cleaning Video"
                    />
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: '#eeedf3',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: "50px 60px",
        flexWrap: "wrap", // Makes the layout responsive
        maxWidth: "1300px",
        margin: "0 auto", // Centers the container horizontally
        marginTop: '-1230px',
        borderRadius: '15px'
    },
    con: {
        alignItems: "center",

        height: '900px',
        backgroundColor: '#5d7faa',
        // display: "flex",
        maxWidth: "100%",
        margin: "0 auto", // Centers the container horizontally
        marginTop: '390px'
    },
    hh:{
        textAlign: "center",
        color:'white',

    },
    row:{
        display: "flex",
         flexDirection: "row",
         justifyContent:'center'

    },

    col: {
        alignItems: "center",
        color: '#5c86bd',

        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '15px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9', // Light background for better contrast
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'left',
        maxWidth: '600px'
    },
    text: {
        color: '#5c86bd',
        fontSize: "1.1rem",
        fontWeight: "300",
        marginBottom: "20px",
    },
    headin: {        

        fontSize: '1.5rem', // Adjusted for better readability
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    paragraph: {
        fontSize: '1rem',
        lineHeight: '1.5',
    },

    textContainer: {
        marginLeft: '20px', // Reduced margin for better spacing on small screens
        flex: "1",
        maxWidth: "600px", // Prevents text from stretching too wide
        fontFamily: "'Helvetica Neue', sans-serif",
        lineHeight: "1.6",
        padding: "20px", // Adds padding for better readability
    },
    videoContainer: {
        flex: "1",
        maxWidth: "300px", // Prevents video from being too wide
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: '30px',
    },
    heading: {
        color: '#5c86bd',
        fontSize: "2.5rem",
        fontWeight: "700",
        marginBottom: "20px",
        transition: "color 0.3s", // Added transition for hover effect
    },
    video: {
        width: "100%",
        height: "auto",
        borderRadius: "8px", // Matches the container's rounded corners
        transition: "transform 0.3s ease", // Added transition for hover effect
    },
};

export default Why;


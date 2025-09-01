// import React, { useState, useEffect } from "react";
// import './Clien.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import Nav from '../nav/Nav';

// function Clien() {
//   const user = JSON.parse(localStorage.getItem('userId'));
//   const [step, setStep] = useState(1); // Step state
//   const [bookingDetails, setBookingDetails] = useState({
//     totalprix: '',
//     zipCode: '',
//     address: '',
//     cleaningType: '',
//     extraService: '',
//     date: '',
//     time: '',
//     service: '',
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//     paymentMethod: ''
//   });

//   const navigate = useNavigate(); // Use the useNavigate hook

//   // Handle form field changes
//   const handleChange = (e) => {
//     setBookingDetails({
//       ...bookingDetails,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Calculate the total price based on selected cleaning type and extra services
//   useEffect(() => {
//     const servicePricing = {
//       basic: 250,
//       deep: 300,
//       move: 400,
//       post: 600,
//     };

//     let extraCost = 0;
//     if (bookingDetails.extraService) {
//       if (bookingDetails.extraService === 'option1') extraCost = 20; // Weekend service
//       if (bookingDetails.extraService === 'option2') extraCost = 50; // 24-hour service
//       if (bookingDetails.extraService === 'clean inside fridge') extraCost = 20;
//       if (bookingDetails.extraService === 'Additional Bedrooms') extraCost = 70;
//     }

//     let room = 0;
//     if (bookingDetails.service) {
//       if (bookingDetails.service === '1') room = 20;
//       if (bookingDetails.service === '2') room = 40;
//       if (bookingDetails.service === '3') room = 60;
//       if (bookingDetails.service === '4') room = 80;
//       if (bookingDetails.service === '5') room = 100;
//       if (bookingDetails.service === '6') room = 120;
//     }

//     const selectedCleaningPrice = servicePricing[bookingDetails.cleaningType] || 0;
//     setBookingDetails((prevState) => ({
//       ...prevState,
//       totalprix: selectedCleaningPrice + extraCost + room,
//     }));
//   }, [bookingDetails.cleaningType, bookingDetails.extraService, bookingDetails.service]);

//   // Handle form submission (send data to the backend)
//   const handleSubmit = async (e) => {
//     e.preventDefault();  // Prevent the default form submission behavior
//     try {
//       const response = await axios.post('http://localhost:3002/user/book', { 
//         userId:user.id ,
//         zip: bookingDetails.zipCode,
//         cleaningType: bookingDetails.cleaningType,
//         address: bookingDetails.address,
//         extra: bookingDetails.extraService,
//         date: bookingDetails.date,
//         houre: bookingDetails.time,
//         prix: bookingDetails.totalprix,
//         room: bookingDetails.service
//       });

//       if (response.data.status === 'success') {
//         console.log('Booking successful');
//       } else {
//         console.log('Something went wrong');
//       }
//     } catch (error) {
//       console.log('An error occurred');
//       console.error(error); 
//     }
//   };

//   const handleUser = async (e) => {
//     e.preventDefault();  
//     try {
//       const response = await axios.post('http://localhost:3002/user/create', { 
//         userId:user.id ,
//         firstname: bookingDetails.firstName,
//         lastname: bookingDetails.lastName,
//         phone: bookingDetails.phone,
//         email: bookingDetails.email
//       });

//       if (response.data.status === 'success') {
//         console.log('user successful');
//       } else {
//         console.log('Something went wrong');
//       }
//     } catch (error) {
//       console.log('An error occurred');
//       console.error(error); 
//     }
//   };

//   // Navigation between steps
//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   // Validation for Step 1
//   const validateStep1 = () => {
//     return bookingDetails.zipCode && bookingDetails.cleaningType;
//   };

//   // Validation for Step 2
//   const validateStep2 = () => {
//     return bookingDetails.firstName && bookingDetails.lastName && bookingDetails.phone && bookingDetails.email;
//   };

//   // Progress bar calculation
//   const progressBarWidth = `${(step - 1) * 33.33}%`; // Each step represents 33.33% width

//   const formattedDate = bookingDetails.date ? new Date(bookingDetails.date).toLocaleDateString('en-US', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
//   }) : 'Date not set'; 

//   return (
//     <div>
//       <Nav/>
//       <div style={{ backgroundColor: '#5c86bd', color: 'white', height: '300px', marginTop: '10px' }}>
//         <strong style={{ fontSize: '45px', marginLeft: '450px' }}>Get an Instant Quote</strong>
//         <div style={{
//           backgroundColor: 'white', color: '#5c86bd', height: '650px', width: '700px',
//           marginLeft: '350px', marginTop: '30px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
//         }}>
//           <br />
//           {/* Steps Indicator */}
//           <div className="steps">
//             <span className={`circle ${step >= 1 ? 'active' : ''}`}>1</span>
//             <span className={`circle ${step >= 2 ? 'active' : ''}`}>2</span>
//             <div className="progress-bar">
//               <span className="indicator" style={{ width: progressBarWidth }}></span>
//             </div>
//           </div>

//           {/* Step 1: Booking Details */}
//           {step === 1 && (
//             <div className="row">
//               <h3>Your Booking Details</h3>
//               <h3>Total Price: {`${bookingDetails.totalprix}dh`}</h3>
//               <div className="input-container">
//                 <input type="text" className="input-field zip" name="zipCode" value={bookingDetails.zipCode} onChange={handleChange} placeholder="Zip code" />
//                 <input type="text" className="input-field city" name="city" value="Casablanca" readOnly placeholder="City" />
//               </div>
//               <input type="text" className="address input-field" name="address" value={bookingDetails.address} onChange={handleChange} placeholder="Address" />
//               <select className="address input-field" name="cleaningType" value={bookingDetails.cleaningType} onChange={handleChange}>
//                 <option value="">Select Cleaning Type</option>
//                 <option value='basic'>Basic Cleaning (250dh)</option>
//                 <option value="deep">Deep Cleaning (300dh)</option>
//                 <option value="move">Move-In/Move-Out Cleaning (400dh)</option>
//                 <option value="post">Post-Construction Cleaning (600dh)</option>
//               </select>
//               <select className="address input-field" name="extraService" value={bookingDetails.extraService} onChange={handleChange}>
//                 <option value="">Select Extra Service</option>
//                 <option value="option1">Weekend service +20dh</option>
//                 <option value="option2">*Services within 24 hours +50dh</option>
//                 <option value="clean inside fridge">Clean inside fridge +20dh</option>
//                 <option value="Additional Bedrooms">Additional Bedrooms +70dh</option>
//               </select>
//               <div className="input-container">
//                 <input type="date" style={{ marginLeft: '15px' }} className="input-field date" name="date" value={bookingDetails.date} onChange={handleChange}  min={new Date().toISOString().split("T")[0]}/>
//                 <input type="time" className="input-field time" name="time" value={bookingDetails.time} onChange={handleChange} />
//                 <select style={{ marginRight: '16px' }} className="input-field service" name="service" value={bookingDetails.service} onChange={handleChange}>
//                   <option value="" disabled selected hidden>Choose number of rooms</option>
//                   <option value="1">1 room</option>
//                   <option value="2">2 rooms</option>
//                   <option value="3">3 rooms</option>
//                   <option value="4">4 rooms</option>
//                   <option value="5">5 rooms</option>
//                   <option value="6">6 rooms</option>
//                 </select>
//               </div>
//               <button onClick={(e) => { handleSubmit(e); nextStep(); }} className="button" style={{ marginLeft: '290px', marginTop: '20px' }} disabled={!validateStep1()}>Next</button>
//             </div>
//           )}

//           {/* Step 2: Contact Details */}
//           {step === 2 && (
//             <div className="row" style={{ marginTop: '60px' }}>
//               <h3>Your Contact Details</h3>
//               <strong>Please provide your name, phone number, and email</strong>
//               <div className="input-container">
//                 <input type="text" className="input-field First" name="firstName" value={bookingDetails.firstName} onChange={handleChange} placeholder="First name" />
//                 <input type="text" className="input-field Last" name="lastName" value={bookingDetails.lastName} onChange={handleChange} placeholder="Last name" />
//               </div>
//               <div className="input-container">
//                 <input type="text" className="input-field Phone" name="phone" value={bookingDetails.phone} onChange={handleChange} placeholder="Phone number" />
//                 <input type="text" className="input-field Email" name="email" value={bookingDetails.email} onChange={handleChange} placeholder="Email" />
//               </div>
//               <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
//                 <button onClick={prevStep} className="button">Back</button>
//                 <button
//                   onClick={(e) => {
//                     handleUser(e);
//                     navigate('/Upcoming');  // Use navigate instead of history.push()
//                   }}
//                   className="button"
//                   disabled={!validateStep2()}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Clien;


//////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Clien.css';
import { Link } from 'react-router-dom';


function ProfessionalCleaningForm() {
  const user = JSON.parse(localStorage.getItem('userId'));
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    totalprix:'',
    zipCode: '',
    cleaningType: '',
    address: '',
    extraService: [],
    date: '',
    time: '',
    service: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value, multiple, options } = e.target;

    if (multiple) {
      const values = Array.from(options).filter(opt => opt.selected).map(opt => opt.value);
      setFormData(prev => ({ ...prev, [name]: values }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };



  useEffect(() => {
  const servicePricing = {
    basic: 250,
    deep: 300,
    move: 400,
    post: 600,
  };

  let extraCost = 0;
  if (Array.isArray(formData.extraService)) {
    if (formData.extraService.includes('weekend')) extraCost += 20;
    if (formData.extraService.includes('urgent')) extraCost += 50;
    if (formData.extraService.includes('fridge')) extraCost += 20;
    if (formData.extraService.includes('bedroom')) extraCost += 70;
  }

  let roomCost = 0;
  const roomCount = parseInt(formData.service);
  if (!isNaN(roomCount)) {
    roomCost = roomCount * 20;
  }

  const selectedCleaningPrice = servicePricing[formData.cleaningType] || 0;

  setFormData((prev) => ({
    ...prev,
    totalprix: selectedCleaningPrice + extraCost + roomCost,
  }));
}, [formData.cleaningType, formData.extraService, formData.service]);



   

const handleSubmite = async (e) => {
  e.preventDefault();

  try {
    // Submit booking
    const bookingResponse = await axios.post('http://localhost:3002/user/book', {
      userId: user.id,
      zip: formData.zipCode,
      cleaningType: formData.cleaningType,
      address: formData.address,
      extra: formData.extraService,
      date: formData.date,
      houre: formData.time,
      prix: formData.totalprix,
      room: formData.service,
    });

    // Submit user
    const userResponse = await axios.post('http://localhost:3002/user/create', {
      userId: user.id,
      firstname: formData.firstName,
      lastname: formData.lastName,
      phone: formData.phone,
      email: formData.email,
    });

    if (bookingResponse.data.status === 'success' && userResponse.data.status === 'success') {
      console.log('success');
    } else {
      console.log('Something went wrong');
    }

  } catch (error) {
    console.error('An error occurred', error);
  }
};


 

  return (
  <><Link to="/" className="back-home">
      ← Back to Home
    </Link>
    <div className="form-container">
       
      <div className="image-section">
        <div className="image-overlay"></div>

        <div className="image-content">
          <span className="icon">✨</span>
          <h3 className="image-title">Professional Cleaning</h3>
          <p className="image-subtitle">
            Experience premium cleaning services with our expert team.
            Quality guaranteed, satisfaction assured.
          </p>
          <div style={{ marginTop: '32px', display: 'flex', gap: '8px', fontSize: '14px', justifyContent: 'center' }}>
            
            <h3>Total Price: {`${formData.totalprix}dh`}</h3>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="header">
          <h2 className="title">Book Your Service</h2>
          <p className="subtitle">
            Fill out the details below and we'll take care of the rest.
            Professional cleaning at your convenience.
          </p>
        </div>

        <form >
          <div className="form-grid">
            <div className="input-group">
              <label className="label">Zip Code</label>
              <input  type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="label">Cleaning Type</label>
              <select  name="cleaningType" value={formData.cleaningType} onChange={handleChange}>
                <option value="">Select cleaning type</option>
                <option value="basic">Basic Cleaning</option>
                <option value="deep">Deep Cleaning</option>
                <option value="move">Move In/Out Cleaning</option>
                <option value="post">Post Construction</option>
              </select>
            </div>

            <div className="input-group">
              <label  className="label">Address</label>
              <input  type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="label">Number of Rooms</label>
              <select  name="service" value={formData.service} onChange={handleChange}>
                <option value="">Select rooms</option>
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} room{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="label">Preferred Date</label>
              <input  type="date" name="date" value={formData.date} onChange={handleChange}  min={new Date().toISOString().split("T")[0]}/>
            </div>

            <div className="input-group">
              <label className="label">Preferred Time</label>
              <input  type="time" name="time" value={formData.time} onChange={handleChange} />
            </div>

            <div className="input-group full-width">
              <label className="label">Additional Services</label>
              <select name="extraService" multiple value={formData.extraService} onChange={handleChange}>
                <option value="fridge">🧊 Clean inside fridge (+20dh)</option>
                <option value="weekend">📅 Weekend service (+20dh)</option>
                <option value="urgent">⚡ 24h service (+50dh)</option>
                <option value="bedroom">🛏️ Extra bedroom (+70dh)</option>
              </select>
              <div className="extra-info">
                💡 <strong>Tip:</strong> Hold <strong>Ctrl</strong> (Windows) or <strong>Cmd</strong> (Mac) to select multiple services
              </div>
            </div>

            <div className="input-group">
              <label className="label">First Name</label>
              <input  type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="label">Last Name</label>
              <input  type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="label">Phone Number</label>
              <input  type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label className="label">Email Address</label>
              <input  type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <button 
          onClick={(e) => {
                   handleSubmite(e);
                    navigate('/Upcoming');  // Use navigate instead of history.push()
                  }}

className="submit-button">🚀 Book My Cleaning Service</button>
        </form>

        <div className="guarantee-box">
          <p>🛡️ Satisfaction Guaranteed</p>
          <p>Professional, insured cleaners • Eco-friendly products • 24/7 customer support</p>
        </div>
      </div>
    </div>
  </>);
}

export default ProfessionalCleaningForm;

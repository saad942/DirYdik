// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Nav from '../nav/Nav';

// const Upcoming = () => {
//   const user = JSON.parse(localStorage.getItem('userId')); // User data from localStorage
//   const [information, setInformation] = useState([]); // Stores booking data
//   const [viewDetails, setViewDetails] = useState(null); // Stores the selected booking to show details
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
 


//   // Fetch upcoming bookings from the API
//   useEffect(() => {
//     if (user && user.id) {
//       axios.get(`http://localhost:3002/user/getBook/${user.id}`)
//         .then((response) => {
//           setInformation(response.data); // Store booking data in state
//           setLoading(false); // Disable loading after data is fetched
//         })
//         .catch((error) => {
//           setError('Error fetching data'); // Handle errors
//           setLoading(false); // Disable loading even on error
//         });
//     } else {
//       setError('User ID is missing'); // Handle missing user ID error
//       setLoading(false);
//     }
//   }, [user]);

//   // Toggle the view details for a specific booking
//   const handleViewDetails = (bookId) => {
//     setViewDetails(viewDetails === bookId ? null : bookId);
//   };

//   const handleDelete = (bookId) => {
//     console.log(`Deleting order with ID: ${bookId}`);
   
//   };
//   return (
//     <><Nav/>
//     <div className="mt-5">
//       <div className="text-center mb-4">
//         <h2 className="display-4 text-primary">Upcoming Book Orders</h2>
//       </div>

//       <div className="table-responsive" style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
//         <table className="table table-hover table-bordered shadow-sm">
//           <thead className="table-dark">
//             <tr>
//               <th>Date</th>
//               <th>Hour</th>
//               <th>Price</th>
//               <th>status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="4" className="text-center">
//                 </td>
//               </tr>
//             ) : error ? (
//               <tr>
//                 <td colSpan="4" className="text-center text-danger">
//                   {error}
//                 </td>
//               </tr>
//             ) : information.length > 0 ? (
//               information.map((info, index) => (
//                 <React.Fragment key={index}>
//                   <tr style={{ textAlign: 'center' }}>
//                     <td>{info.date}</td>
//                     <td>{info.houre}</td>
//                     <td><strong>{info.prix} MAD</strong></td>
//                     <td>{info.status}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger me-2"
//                         onClick={() => handleDelete(info.bookId)}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         className="btn btn-info me-2"
//                         onClick={() => handleViewDetails(info.bookId)}
//                       >
//                         {viewDetails === info.bookId ? "Hide Details" : "View"}
//                       </button>
                      
//                     </td>
//                   </tr>
//                   {viewDetails === info.bookId && (
//                     <tr>
//                       <td colSpan="8">
//                       <div class="details p-4 bg-white rounded shadow">
//   <h5 class="text-primary border-bottom pb-2 mb-3">Booking Details</h5>
//   <ul class="list-group list-group-flush">
//     <li class="list-group-item d-flex justify-content-between align-items-center">
//       <strong>Zip:</strong> <span>{info.zip}</span>
//     </li>
//     <li class="list-group-item d-flex justify-content-between align-items-center">
//       <strong>Address:</strong> <span>{info.address}</span>
//     </li>
//     <li class="list-group-item d-flex justify-content-between align-items-center">
//       <strong>Cleaning Type:</strong> <span>{info.cleaningType}</span>
//     </li>
//     <li class="list-group-item d-flex justify-content-between align-items-center">
//       <strong>Extra:</strong> <span>{info.extra}</span>
//     </li>
//     <li class="list-group-item d-flex justify-content-between align-items-center">
//       <strong>Room:</strong> <span>{info.room}</span>
//     </li>
//   </ul>
// </div>

//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center text-muted">
//                   No upcoming orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//     </div></>
//   );
// }

// export default Upcoming;// AppointmentDisplay.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from '../nav/Nav';
import "./AppointmentDisplay.css"; // Import the CSS
import {  FaClock,FaMapMarkerAlt ,FaDoorClosed } from 'react-icons/fa';


const AppointmentDisplay = () => {
  const user = JSON.parse(localStorage.getItem("userId"));
  const [appointments, setAppointments] = useState([]);
  const [viewDetails, setViewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`http://localhost:3002/user/getBook/${user.id}`)
        .then((response) => {
          setAppointments(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
          setError("Error fetching appointments. Please try again later.");
          setLoading(false);
        });
    } else {
      setError("User ID is missing. Please log in again.");
      setLoading(false);
    }
  }, [user]);

  const handleViewDetails = (bookId) => {
    setViewDetails(viewDetails === bookId ? null : bookId);
  };

  const handleCancel = async (bookId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        // await axios.delete(`http://localhost:3002/user/cancelBook/${bookId}`);
        setAppointments((prev) => prev.filter((apt) => apt.bookId !== bookId));
      } catch (error) {
        console.error("Error cancelling appointment:", error);
        alert("Failed to cancel appointment. Please try again.");
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "status-confirmed";
      case "pendding":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-default";
    }
  };

  const filteredAppointments = appointments.filter(
    (apt) => filter === "all" || apt.status.toLowerCase() === filter
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (<><Nav/>
  
    <div className="appointment-wrapper">
      
      <div className="header">
        <h1>My Appointments</h1>
        <p>Manage your upcoming cleaning services</p>
        <div className="filter-buttons">
          {["all", "active", "pending"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={filter === status ? "active" : ""}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="appointments">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="no-appointments">
            <p>No appointments found.</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div className="appointment-card" key={appointment.bookId}>
              <div className="card-header">
                <div>
                  <h3>{appointment.cleaningType}</h3>
                  <p>{formatDate(appointment.date)}</p>
                  <p><FaClock className="icon-inline" />{appointment.houre}</p>
                  <strong className="price">{appointment.prix} MAD</strong>

                </div>
                <span className={`status ${getStatusClass(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>

              <div className="card-body">
                <div className="details">
                  <p><FaMapMarkerAlt className="icon-inline" />{appointment.address}</p>
                  <p><FaDoorClosed className="icon-inline" />  {appointment.room} room</p>
                </div>

                <div className="actions">
                  <button onClick={() => handleViewDetails(appointment.bookId)}>
                    {viewDetails === appointment.bookId ? "Hide Details" : "View Details"}
                  </button>
                  <button className="cancel-btn" onClick={() => handleCancel(appointment.bookId)}>
                    Cancel
                  </button>
                </div>

                {viewDetails === appointment.bookId && (
                  <div className="more-details">
                    <p><strong>ZIP Code:</strong> {appointment.zip}</p>
                     <p><strong>Full address:</strong>{appointment.address}</p>
                    <p><strong>Extras:</strong> {appointment.extra || "None"}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div></>
  );
};

export default AppointmentDisplay;

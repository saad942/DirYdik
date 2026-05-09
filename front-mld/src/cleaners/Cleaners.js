import React, { useState, useEffect } from "react";
import Admin from "../admin/Admin";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function Cleaners() {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0); // current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // rows per page
  const [viewDetails, setViewDetails] = useState(null);

  const handleViewDetails = (bookId) => {
    setViewDetails(viewDetails === bookId ? null : bookId);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3002/user/getU");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3002/user/getAll");
        setAppointments(response.data);
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (bookId) => {
    try {
      const response = await axios.put(`http://localhost:3002/user/updateStatut/${bookId}`);
      const updated = response.data;

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.bookId === updated.bookId ? { ...appt, status: updated.status } : appt
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const updateBook = async (bookId, userId) => {
    // Find the appointment and user objects you want to update from your state
    const booking = appointments.find((a) => a.bookId === bookId);
    const user = users.find((u) => u.userId === userId);
    console.log(booking)
   console.log(user)
    if (!booking || !user) {
      console.error("Booking or User not found");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3002/user/updateAppoinment/${bookId}/${userId}`,
        { booking, user }  // <-- send the data here
      );

      const updated = response.data;

      // Update local states as you had before
      setAppointments((prev) =>
        prev.map((a) => (a.bookId === bookId ? { ...a, ...updated.booking } : a))
      );

      setUsers((prev) =>
        prev.map((u) => (u.userId === userId ? { ...u, ...updated.user } : u))
      );
      toast.success('✅ Changes saved successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } catch (error) {
      console.error("Error updating appointment:", error.message);
            toast.error('❌ Failed to save changes');

    }
  };



  const deletedAppoinment = async (bookId) => {
    try {
      const response = await axios.delete(`http://localhost:3002/user/deletedAppoinment/${bookId}`);
      console.log(response);
      console.log('Appoinment deleted successfully');
      setAppointments(appointments.filter(item => item.bookId !== bookId));
      toast.success('🗑️ Appointment deleted successfully');
    } catch (error) {
      console.error("Error deleting Appoinment:", error.message);
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page
  };

  return (
    <div>
      <Admin />
      <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2, marginRight: 15 }}>
        <Typography variant="h4" gutterBottom>
          Cleaners List
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Contact</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((appointment, index) => {
                const user = users.find((u) => u.userId === appointment.userId);

                return (
                  <React.Fragment >
                    <TableRow>
                      <TableCell>{appointment.address}</TableCell>
                      <TableCell>{user ? `${user.firstname} ${user.lastname}` : "N/A"}</TableCell>
                      <TableCell>{user ? user.phone : "N/A"}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>
                        <button
                          style={{
                            backgroundColor: appointment.status === 'active' ? 'green' : 'gray',
                            color: 'white',
                            padding: '5px 10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            width: '100px',
                          }}
                          onClick={() => handleStatusChange(appointment.bookId)}
                        >
                          {appointment.status === 'active' ? 'Active' : 'Pending'}
                        </button>
                      </TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: '#1976d2', cursor: 'pointer' }}
                            onClick={() => handleViewDetails(appointment.bookId)}
                            title={viewDetails === appointment.bookId ? "Hide Details" : "View Details"}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: 'red', cursor: 'pointer' }}
                            onClick={() => deletedAppoinment(appointment.bookId)}
                            title="Delete Appointment"
                          />
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Details Row */}
                    {viewDetails === appointment.bookId && (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <Box
                            component="form"
                            onSubmit={(e) => {
                              e.preventDefault();
                              // Tu peux ajouter ici ta logique d'envoi (PUT request, etc.)
                            }}
                            sx={{
                              backgroundColor: '#fff',
                              borderRadius: '10px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                              padding: '24px',
                              maxWidth: '600px',
                              margin: '32px auto',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 2,
                            }}
                          >
                            <Typography variant="h6" gutterBottom>
                              Update Appointment
                            </Typography>

                            <input
                              type="text"
                              value={appointment.address}
                              onChange={(e) =>
                                setAppointments((prev) =>
                                  prev.map((a) =>
                                    a.bookId === appointment.bookId
                                      ? { ...a, address: e.target.value }
                                      : a
                                  )
                                )
                              }
                              placeholder="Address"
                              style={{
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '15px',
                              }}
                            />

                            <input
                              type="text"
                              value={user ? `${user.firstname} ${user.lastname}` : 'name'}
                              onChange={(e) => {
                                const [firstname, ...rest] = e.target.value.split(" ");
                                const lastname = rest.join(" ");

                                setUsers((prev) =>
                                  prev.map((a) =>
                                    a.userId === appointment.userId
                                      ? { ...a, firstname, lastname }
                                      : a
                                  )
                                );
                              }}

                              style={{
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid #eee',
                                fontSize: '15px',
                                backgroundColor: '#f4f4f4',
                              }}
                            />

                            <input
                              type="text"
                              value={user ? user.phone : 'phone number'}
                              onChange={(e) =>
                                setUsers((prev) =>
                                  prev.map((a) =>
                                    a.userId === appointment.userId
                                      ? { ...a, phone: e.target.value }
                                      : a
                                  )
                                )
                              }
                              style={{
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '15px',
                              }}
                            />

                            <input
                              type="date"
                              value={appointment.date}
                              onChange={(e) =>
                                setAppointments((prev) =>
                                  prev.map((a) =>
                                    a.bookId === appointment.bookId
                                      ? { ...a, date: e.target.value }
                                      : a
                                  )
                                )
                              }
                              style={{
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '15px',
                              }}
                            />

                            <input
                              type="text"
                              value={appointment.zip}
                              onChange={(e) =>
                                setAppointments((prev) =>
                                  prev.map((a) =>
                                    a.bookId === appointment.bookId
                                      ? { ...a, zip: e.target.value }
                                      : a
                                  )
                                )
                              }
                              placeholder="Zip"
                              style={{
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '15px',
                              }}
                            />

                            <input
                              type="text"
                              value={appointment.cleaningType}
                              onChange={(e) =>
                                setAppointments((prev) =>
                                  prev.map((a) =>
                                    a.bookId === appointment.bookId
                                      ? { ...a, cleaningType: e.target.value }
                                      : a
                                  )
                                )
                              }
                              placeholder="Cleaning Type"
                              style={{
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '15px',
                              }}
                            />

                            <input
                              type="text"
                              value={appointment.extra}
                              onChange={(e) =>
                                setAppointments((prev) =>
                                  prev.map((a) =>
                                    a.bookId === appointment.bookId
                                      ? { ...a, extra: e.target.value }
                                      : a
                                  )
                                )
                              }
                              placeholder="Extra"
                              style={{
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '15px',
                              }}
                            />

                            <input
                              type="number"
                              value={appointment.room}
                              onChange={(e) =>
                                setAppointments((prev) =>
                                  prev.map((a) =>
                                    a.bookId === appointment.bookId
                                      ? { ...a, room: e.target.value }
                                      : a
                                  )
                                )
                              }
                              placeholder="Room"
                              style={{
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                fontSize: '15px',
                              }}
                            />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input
                                type="number"
                                value={appointment.prix}
                                onChange={(e) =>
                                  setAppointments((prev) =>
                                    prev.map((a) =>
                                      a.bookId === appointment.bookId
                                        ? { ...a, prix: Number(e.target.value) }
                                        : a
                                    )
                                  )
                                }
                                placeholder="prix"
                                style={{
                                  padding: '10px',
                                  borderRadius: '6px',
                                  border: '1px solid #ccc',
                                  fontSize: '15px',
                                  width: '100px',
                                }}
                              />
                              <span>DH</span>
                            </div>


                            <button
                              onClick={() => {

                                updateBook(appointment.bookId, appointment.userId);

                              }}
                              type="submit"
                              style={{
                                backgroundColor: '#1976d2',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '12px 20px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                marginTop: '16px',
                              }}
                            >
                              Save Changes
                            </button>
                          </Box>

                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}

          </TableBody>
        </Table>

        {/* Pagination Control */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={appointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
            <ToastContainer />

    </div>
  );
}

export default Cleaners;

import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Box, Typography, Card, CardContent, Divider, Grid } from '@mui/material';
import axios from 'axios';
import Admin from '../admin/Admin';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [bookDetails, setBookDetails] = useState({}); // Store book details per user
  const [viewDetails, setViewDetails] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3002/user/getBooks');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch books for a specific user
  const handleViewBooks = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3002/user/getBooks/${userId}`);
      setBookDetails((prevDetails) => ({
        ...prevDetails,
        [userId]: response.data, // Store books for the specific user
      }));
      setViewDetails(viewDetails === userId ? null : userId); // Toggle book details visibility
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };


  const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`http://localhost:3002/user/deleteUser/${userId}`);
        console.log(response);
        console.log('User deleted successfully');
        setUsers(users.filter(item => item.userId!== userId));
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

  return (
    <>
      <Admin />
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
        <Typography variant="h4" gutterBottom>User List</Typography>
        <List>
          {users.map((user) => (
            <React.Fragment key={user.userId}>
              <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary={user.username} secondary={user.email} />
                <Button
                  variant="outlined"
                  onClick={() => deleteUser(user.userId)}
                  color="danger"
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleViewBooks(user.userId)}
                  color="primary"
                >
                  {viewDetails === user.userId ? 'Hide Details' : 'View'}
                </Button>
              </ListItem>

              {viewDetails === user.userId && bookDetails[user.userId] && (
                <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', marginTop: 2 }}>
                  <Typography variant="h6">Booking Details</Typography>
                  <Grid container spacing={2}>
                    {bookDetails[user.userId].map((book) => (
                      <Grid item xs={12} sm={6} md={4} key={book.bookId}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="h6">Booking {book.bookId}</Typography>
                            <Divider sx={{ marginY: 1 }} />
                            <Typography variant="body2">
                              <strong>Date:</strong> {book.date}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Hour:</strong> {book.houre}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Price:</strong> {book.prix} dh
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
  );
};

export default UserList;

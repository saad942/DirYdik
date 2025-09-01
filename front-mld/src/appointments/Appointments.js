import React, { useState, useEffect } from "react";
import Admin from "../admin/Admin";
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Select, 
  MenuItem,
  Paper,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Container,
  Fade
} from "@mui/material";
import { 
  Search as SearchIcon, 
  Person as PersonIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon, 
  CalendarToday as CalendarIcon,
  FilterList as FilterIcon,
  Dashboard as DashboardIcon
} from "@mui/icons-material";
import axios from "axios";

function Appointments() {
  const [users, setUsers] = useState([]); // State for users
  const [appointments, setAppointments] = useState([]); // State for appointments
  const [filter, setFilter] = useState("day");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetching users
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
    // Fetching all appointments
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

  const filterAppointments = (appointments, filter) => {
    const currentDate = new Date();
    if (filter === 'month') {
      return appointments.filter(item => new Date(item.date).getMonth() === currentDate.getMonth());
    } else if (filter === 'week') {
      return appointments.filter(item => getWeek(new Date(item.date)) === getWeek(currentDate));
    } else if (filter === 'day') {
      return appointments.filter(item => new Date(item.date).toDateString() === currentDate.toDateString());
    }
    return appointments;
  }

  // Helper function to get the week number of the year
  function getWeek(date) {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7);
  }

  // Get status color based on date
  const getAppointmentStatus = (date) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    const diffTime = appointmentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { label: 'Past', color: 'default' };
    if (diffDays === 0) return { label: 'Today', color: 'success' };
    if (diffDays === 1) return { label: 'Tomorrow', color: 'warning' };
    return { label: 'Upcoming', color: 'primary' };
  };

  const filteredAppointments = filterAppointments(appointments, filter).filter(appointment =>
    appointment.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    users.some(user => user.firstname?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = [
    { label: "Total", count: appointments.length, color: "#1976d2" },
    { label: "Today", count: filterAppointments(appointments, "day").length, color: "#2e7d32" },
    { label: "This Week", count: filterAppointments(appointments, "week").length, color: "#ed6c02" },
    { label: "This Month", count: filterAppointments(appointments, "month").length, color: "#9c27b0" }
  ];

  return (
    <div >
      <Admin />
      <div style={{ backgroundColor: '#f5f5f5' ,paddingLeft: 'calc(2rem + 250px)' }}>

      
     

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in timeout={500 + index * 200}>
                <Card sx={{ 
                  background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}25)`,
                  border: `1px solid ${stat.color}30`,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography color="textSecondary" gutterBottom variant="body2">
                          {stat.label}
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ color: stat.color, fontWeight: 'bold' }}>
                          {stat.count}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                        <CalendarIcon />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Controls */}
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search appointments by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <FilterIcon color="action" />
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#667eea',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                      },
                    },
                  }}
                >
                  <MenuItem value="day">Today</MenuItem>
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                </Select>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Appointments Cards */}
        {filteredAppointments.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <CalendarIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              No appointments found
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Try adjusting your search or filter criteria
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredAppointments.map((appointment, index) => {
              const user = users[index] || {};
              const status = getAppointmentStatus(appointment.date);
              
              return (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Fade in timeout={300 + index * 100}>
                    <Card sx={{ 
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 35px rgba(0,0,0,0.15)'
                      },
                      border: '1px solid #f0f0f0'
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        {/* Header with Status */}
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                          <Chip 
                            label={status.label}
                            color={status.color}
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                          <Typography variant="body2" color="textSecondary">
                            {appointment.date}
                          </Typography>
                        </Box>

                        {/* User Info */}
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar 
                            sx={{ 
                              bgcolor: '#667eea', 
                              width: 48, 
                              height: 48,
                              mr: 2,
                              background: 'linear-gradient(135deg, #667eea, #764ba2)'
                            }}
                          >
                            <PersonIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                              {user.firstname || "N/A"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Customer
                            </Typography>
                          </Box>
                        </Box>

                        {/* Contact Details */}
                        <Box sx={{ mt: 2 }}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <PhoneIcon sx={{ color: '#667eea', mr: 1, fontSize: 20 }} />
                            <Typography variant="body2" color="textSecondary">
                              {user.phone || "N/A"}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="flex-start">
                            <LocationIcon sx={{ color: '#667eea', mr: 1, fontSize: 20, mt: 0.2 }} />
                            <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.4 }}>
                              {appointment.address}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Enhanced Table View */}
        <Box mt={6}>
          <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <Box sx={{ p: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                Detailed Table View
              </Typography>
            </Box>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAppointments.map((appointment, index) => {
                  const user = users[index] || {};
                  const status = getAppointmentStatus(appointment.date);
                  
                  return (
                    <TableRow 
                      key={index}
                      sx={{ 
                        '&:hover': { backgroundColor: '#f8f9fa' },
                        '&:nth-of-type(even)': { backgroundColor: '#fafbfc' }
                      }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <LocationIcon sx={{ color: '#667eea', mr: 1, fontSize: 18 }} />
                          {appointment.address}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <PersonIcon sx={{ color: '#667eea', mr: 1, fontSize: 18 }} />
                          {user.firstname || "N/A"}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <PhoneIcon sx={{ color: '#667eea', mr: 1, fontSize: 18 }} />
                          {user.phone || "N/A"}
                        </Box>
                      </TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>
                        <Chip 
                          label={appointment.status}
                          color={status.color}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Box>
        </Container>
        </div>
    </div>
  );
}

export default Appointments;
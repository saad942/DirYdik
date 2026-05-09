import React, { useState, useEffect } from 'react';
import Admin from "../admin/Admin";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  Users, UserCheck, Clock, Calendar, TrendingUp, RefreshCw, AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    statusCount: { active: 0, pending: 0 },
    userCount: 0,
    appointments: [],
    users: [],
    appointmentStats: { confirmed: 0, pending: 0, cancelled: 0, completed: 0 },
    loading: true,
    error: null
  });

  const API_BASE_URL = 'http://localhost:3002/user';

  const fetchDashboardData = async () => {
    try {
      setDashboardData(prev => ({ ...prev, loading: true, error: null }));
      
      const [countRes, apptsRes, usersRes,conA] = await Promise.all([
        fetch(`${API_BASE_URL}/getcount`),
        fetch(`${API_BASE_URL}/getAll`),
        fetch(`${API_BASE_URL}/getU`),
        fetch(`${API_BASE_URL}/getAUTH`),
      ]);

      // Check if all requests were successful
      if (!countRes.ok || !apptsRes.ok || !usersRes.ok) {
        throw new Error('One or more API requests failed');
      }

      const countData = await countRes.json();
      const apptsData = await apptsRes.json();
      const usersData = await usersRes.json();
      const userA =await conA.json();

      const appts = Array.isArray(apptsData) ? apptsData : [];
      const users = Array.isArray(usersData) ? usersData : [];

      // Count appointments by status
      const appointmentStats = appts.reduce((stats, apt) => {
        const s = (apt.status || '').toLowerCase();
        stats[s] !== undefined ? stats[s]++ : stats.pending++;
        return stats;
      }, { active: 0, pending: 0, confirmed: 0, cancelled: 0, completed: 0 });

      // Count users based on isVerified status
      const userStatusCount = userA.reduce((stats, user) => {
        if (user.isVerified === true) {
          stats.active++;
        } else {
          stats.pending++;
        }
        return stats;
      }, { active: 0, pending: 0 });
    
      setDashboardData({
        statusCount: {
          active: userStatusCount.active,
          pending: userStatusCount.pending
        },
        userCount: countData.count || users.length || 0,
        appointments: appts,
        users: users,
        appointmentStats,
        loading: false,
        error: null
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setDashboardData(prev => ({ ...prev, loading: false, error: 'Failed to load dashboard data' }));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, gradient }) => {
    const displayValue = dashboardData.loading
      ? '...'
      : typeof value === 'number'
        ? value.toLocaleString()
        : '0';

    return (
      <div className="stat-card">
        <div className={`stat-card-inner ${gradient}`}>
          <div className="stat-card-content">
            <div className="stat-card-icon"><Icon size={28} /></div>
            <div className="stat-card-info">
              <div className="stat-card-value">{displayValue}</div>
              <div className="stat-card-title">{title}</div>
            </div>
          </div>
          <div className="stat-card-decoration"></div>
        </div>
      </div>
    );
  };

  const pieData = [
    { name: 'Active Users', value: dashboardData.statusCount.active, color: '#10b981' },
    { name: 'Pending Users', value: dashboardData.statusCount.pending, color: '#f59e0b' }
  ];

  const appointmentPieData = [
    { name: 'Active', value: dashboardData.appointmentStats.active, color: '#10b981' },
    { name: 'Pending', value: dashboardData.appointmentStats.pending, color: '#f59e0b' },
  ];

  const barData = [
    { name: 'Total Users', count: dashboardData.userCount },
    { name: 'Active Users', count: dashboardData.statusCount.active },
    { name: 'Pending Users', count: dashboardData.statusCount.pending },
    { name: 'Total Appointments', count: dashboardData.appointments.length }
  ];

  if (dashboardData.loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-spinner">
            <RefreshCw size={32} className="spin-icon" />
          </div>
          <div className="loading-text">Loading dashboard...</div>
        </div>
        <style jsx>{`
          .loading-container {
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            height: 60vh;
            color: #6b7280;
          }
          .spin-icon {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div><Admin/>
    <>
    
      <div className="dashboard-container">
        {/* Header & Refresh */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <button className="refresh-btn" onClick={fetchDashboardData}>
              <RefreshCw size={16}/> Refresh Data
            </button>
          </div>
          {dashboardData.error && (
            <div className="error-banner">
              <AlertCircle size={20} />
              <span>{dashboardData.error}</span>
              <button className="retry-btn" onClick={fetchDashboardData}>Retry</button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard title="Total Users" value={dashboardData.userCount} icon={Users} gradient="gradient-purple" />
          <StatCard title="Active Users" value={dashboardData.statusCount.active} icon={UserCheck} gradient="gradient-green" />
          <StatCard title="Pending Users" value={dashboardData.statusCount.pending} icon={Clock} gradient="gradient-orange" />
          <StatCard title="Appointments" value={dashboardData.appointments.length} icon={Calendar} gradient="gradient-blue" />
        </div>

        {/* Charts */}
        <div className="charts-section">
          <div className="chart-card chart-card-large">
            <h3 className="chart-title"><TrendingUp size={20}/> Statistics Overview</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }}/>
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }}/>
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">User Status</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={60} innerRadius={30} dataKey="value" startAngle={90} endAngle={450}>
                  {pieData.map((entry,index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {pieData.map((entry, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: entry.color }}></div>
                  <span className="legend-text">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Appointment Status</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={appointmentPieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  innerRadius={30}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {appointmentPieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend-grid">
              {appointmentPieData.map((entry, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: entry.color }}></div>
                  <span className="legend-text">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="tables-section">
          <div className="table-card">
            <h3 className="table-title">Recent Users</h3>
            <table className="data-table">
              <thead>
                <tr><th>ID</th>
                <th>Email</th></tr>
              </thead>
              <tbody>
                {dashboardData.users.slice(0,5).map((u,i) => (
                  <tr key={u._id || i}>
                    <td>#{u.userId || i+1}</td>
                    <td>{u.email || 'N/A'}</td>
                  </tr>
                ))}
                {!dashboardData.users.length && (
                  <tr><td colSpan="3" className="empty-state">No users data available</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-card">
            <h3 className="table-title">Recent Appointments</h3>
            <table className="data-table">
              <thead>
                <tr><th>ID</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {dashboardData.appointments.slice(0,5).map((a,i) => (
                  <tr key={a.id || i}>
                    <td>#{a.id || i+1}</td>
                    <td>{a.date || a.created_at || 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${
                        a.status === 'confirmed' ? 'status-confirmed' :
                        a.status === 'completed' ? 'status-completed' :
                        a.status === 'cancelled' ? 'status-cancelled' :
                        'status-pending'
                      }`}>
                        {a.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
                {!dashboardData.appointments.length && (
                  <tr><td colSpan="3" className="empty-state">No appointments data available</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

       <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          padding-left: calc(2rem + 250px); /* Account for sidebar width */
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          transition: padding-left 0.3s ease;
        }

        .dashboard-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .refresh-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
        }

        .refresh-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .error-banner {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          border: 1px solid #f87171;
          color: #dc2626;
          padding: 1rem;
          border-radius: 12px;
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .retry-btn {
          background: #dc2626;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          margin-left: auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          position: relative;
          height: 140px;
        }

        .stat-card-inner {
          height: 100%;
          border-radius: 16px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          color: white;
        }

        .gradient-purple {
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
        }

        .gradient-green {
          background: linear-gradient(135deg, #10b981, #059669);
        }

        .gradient-orange {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .gradient-blue {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .stat-card-content {
          display: flex;
          align-items: center;
          height: 100%;
          position: relative;
          z-index: 2;
        }

        .stat-card-icon {
          margin-right: 1rem;
          opacity: 0.9;
        }

        .stat-card-value {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .stat-card-title {
          font-size: 0.95rem;
          opacity: 0.9;
          font-weight: 500;
        }

        .stat-card-decoration {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }

        .charts-section {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .chart-card-large {
          grid-column: span 1;
        }

        .chart-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 1rem 0;
          padding: 1.5rem 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pie-legend {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1rem;
          padding: 0 1.5rem 1.5rem;
        }

        .pie-legend-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0 1.5rem 1.5rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .legend-text {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        .tables-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .table-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .table-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          padding: 1.5rem 1.5rem 0;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          text-align: left;
          padding: 1rem 1.5rem;
          font-weight: 600;
          color: #6b7280;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e5e7eb;
        }

        .data-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f3f4f6;
          font-size: 0.875rem;
        }

        .data-table tr:hover {
          background-color: rgba(102, 126, 234, 0.02);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-active {
          background-color: #d1fae5;
          color: #065f46;
        }

        .status-pending {
          background-color: #fef3c7;
          color: #92400e;
        }

        .status-confirmed {
          background-color: #d1fae5;
          color: #065f46;
        }

        .status-completed {
          background-color: #dbeafe;
          color: #1e40af;
        }

        .status-cancelled {
          background-color: #fee2e2;
          color: #991b1b;
        }

        .empty-state {
          text-align: center;
          color: #9ca3af;
          padding: 2rem 1.5rem;
          font-style: italic;
        }

        @media (max-width: 1024px) {
          .charts-section {
            grid-template-columns: 1fr;
          }
          
          .tables-section {
            grid-template-columns: 1fr;
          }

          .dashboard-container {
            padding-left: calc(2rem + 200px); /* Smaller sidebar on tablet */
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
            padding-left: 1rem; /* Remove sidebar padding on mobile */
          }
          
          .dashboard-title {
            font-size: 2rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        /* Sidebar compatibility classes */
        .dashboard-with-sidebar-collapsed {
          padding-left: calc(2rem + 80px) !important; /* When sidebar is collapsed */
        }

        .dashboard-with-sidebar-hidden {
          padding-left: 2rem !important; /* When sidebar is completely hidden */
        }

        @media (max-width: 1200px) {
          .dashboard-container {
            padding-left: calc(1.5rem + 200px);
          }
        }
      `}</style>
    </>
    </div>
  );
};

export default Dashboard;
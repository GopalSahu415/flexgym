import { useState, useEffect } from 'react';
import { getAdminStats, getLeads, getAppointments, updateLeadStatus, updateAppointmentStatus } from '../api';
import './Admin.css';

const ADMIN_PASS = 'flexgym@admin2024'; // In production, use proper auth

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const login = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setAuthenticated(true);
      loadDashboard();
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [statsRes, leadsRes, apptsRes] = await Promise.all([
        getAdminStats(),
        getLeads(),
        getAppointments(),
      ]);
      setStats(statsRes.data.stats);
      setLeads(leadsRes.data.data);
      setAppointments(apptsRes.data.data);
    } catch (err) {
      console.error('Dashboard load error:', err);
    }
    setLoading(false);
  };

  const handleLeadStatus = async (id, status) => {
    await updateLeadStatus(id, status);
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
  };

  const handleApptStatus = async (id, status) => {
    await updateAppointmentStatus(id, status);
    setAppointments((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
  };

  const formatDate = (d) => new Date(d).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <div className="admin-logo">
            <span style={{ color: 'var(--neon)' }}>FLEX</span>GYM
          </div>
          <h2 className="admin-title">Admin Dashboard</h2>
          <form onSubmit={login}>
            {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}
            <div className="form-group">
              <label className="form-label">Admin Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <span>Access Dashboard</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span style={{ color: 'var(--neon)' }}>FLEX</span>GYM
        </div>
        <nav className="admin-nav">
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'leads', label: '📋 Leads' },
            { id: 'appointments', label: '📅 Appointments' },
          ].map((item) => (
            <button
              key={item.id}
              className={`admin-nav-btn ${tab === item.id ? 'active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button className="admin-logout" onClick={() => setAuthenticated(false)}>
          🚪 Logout
        </button>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-header">
          <h1 className="admin-page-title">
            {tab === 'dashboard' && 'Dashboard Overview'}
            {tab === 'leads' && 'All Leads'}
            {tab === 'appointments' && 'All Appointments'}
          </h1>
          <button className="btn btn-outline" onClick={loadDashboard} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
            <span>🔄 Refresh</span>
          </button>
        </div>

        {loading && <div className="admin-loading">Loading data...</div>}

        {/* Dashboard Tab */}
        {tab === 'dashboard' && stats && (
          <div>
            <div className="stats-grid">
              {[
                { label: 'Total Leads', value: stats.totalLeads, icon: '📋', color: 'var(--neon)' },
                { label: 'New Leads', value: stats.newLeads, icon: '🆕', color: '#4CAF50' },
                { label: 'Total Appointments', value: stats.totalAppointments, icon: '📅', color: '#FF9800' },
                { label: 'Pending Trials', value: stats.pendingAppointments, icon: '⏳', color: '#9C27B0' },
              ].map((s) => (
                <div key={s.label} className="stat-card">
                  <div className="stat-card-icon">{s.icon}</div>
                  <div className="stat-card-value" style={{ color: s.color }}>{s.value}</div>
                  <div className="stat-card-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="admin-section-title">Recent Leads</div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th><th>Phone</th><th>Source</th><th>Status</th><th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.slice(0, 5).map((l) => (
                    <tr key={l._id}>
                      <td>{l.name}</td>
                      <td><a href={`tel:${l.phone}`}>{l.phone}</a></td>
                      <td><span className="badge">{l.source}</span></td>
                      <td><span className={`status-badge status-${l.status}`}>{l.status}</span></td>
                      <td>{formatDate(l.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {tab === 'leads' && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th><th>Name</th><th>Phone</th><th>Message</th><th>Source</th><th>Status</th><th>Date</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={l._id}>
                    <td>{i + 1}</td>
                    <td><strong>{l.name}</strong></td>
                    <td><a href={`tel:${l.phone}`}>{l.phone}</a></td>
                    <td className="td-message">{l.message || '—'}</td>
                    <td><span className="badge">{l.source}</span></td>
                    <td><span className={`status-badge status-${l.status}`}>{l.status}</span></td>
                    <td>{formatDate(l.createdAt)}</td>
                    <td>
                      <select
                        className="admin-select"
                        value={l.status}
                        onChange={(e) => handleLeadStatus(l._id, e.target.value)}
                      >
                        {['new','contacted','converted','closed'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Appointments Tab */}
        {tab === 'appointments' && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th><th>Name</th><th>Phone</th><th>Goal</th><th>Preferred Time</th><th>Status</th><th>Date</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, i) => (
                  <tr key={a._id}>
                    <td>{i + 1}</td>
                    <td><strong>{a.name}</strong></td>
                    <td><a href={`tel:${a.phone}`}>{a.phone}</a></td>
                    <td>{a.fitnessGoal}</td>
                    <td>{a.preferredTime}</td>
                    <td><span className={`status-badge status-${a.status}`}>{a.status}</span></td>
                    <td>{formatDate(a.createdAt)}</td>
                    <td>
                      <select
                        className="admin-select"
                        value={a.status}
                        onChange={(e) => handleApptStatus(a._id, e.target.value)}
                      >
                        {['pending','confirmed','completed','cancelled'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

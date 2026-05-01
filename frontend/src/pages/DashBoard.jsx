import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import './DashBoard.css';

const DashBoard = () => {
  const navigate = useNavigate();
  // Get actual user from Zustand global state
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        {user && <div className="user-info">Welcome, {user.name}</div>}
      </header>
      
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav>
            <ul>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#profile">Profile Settings</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#activity">Activity Log</a></li>
            </ul>
          </nav>
        </aside>
        
        <main className="dashboard-main">
          <section className="stats-grid">
            <div className="stat-card">
              <h3>Total Views</h3>
              <p className="stat-value">1,245</p>
            </div>
            <div className="stat-card">
              <h3>Active Sessions</h3>
              <p className="stat-value">12</p>
            </div>
            <div className="stat-card">
              <h3>New Messages</h3>
              <p className="stat-value">4</p>
            </div>
          </section>

          <section className="dashboard-panel">
            <h2>Recent Activity</h2>
            <ul className="activity-list">
              <li>
                <span className="activity-time">10:42 AM</span>
                <span className="activity-text">Successful login from new IP</span>
              </li>
              <li>
                <span className="activity-time">09:15 AM</span>
                <span className="activity-text">Profile settings updated</span>
              </li>
              <li>
                <span className="activity-time">Yesterday</span>
                <span className="activity-text">Password changed successfully</span>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashBoard;

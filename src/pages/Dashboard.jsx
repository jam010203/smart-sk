import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back, {user?.name || 'User'}</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon blue">📊</div>
          <div className="card-content">
            <h3 className="card-title">Overview</h3>
            <p className="card-value">Active</p>
            <p className="card-description">System is operational</p>
          </div>
        </div>

        {user?.role === 'admin' && (
          <>
            <div className="dashboard-card">
              <div className="card-icon green">👥</div>
              <div className="card-content">
                <h3 className="card-title">Users</h3>
                <p className="card-value">Manage</p>
                <p className="card-description">View and manage all users</p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-icon orange">➕</div>
              <div className="card-content">
                <h3 className="card-title">Accounts</h3>
                <p className="card-value">Generate</p>
                <p className="card-description">Create new user accounts</p>
              </div>
            </div>
          </>
        )}

        <div className="dashboard-card">
          <div className="card-icon gray">🔒</div>
          <div className="card-content">
            <h3 className="card-title">Security</h3>
            <p className="card-value">Protected</p>
            <p className="card-description">Data is encrypted and secure</p>
          </div>
        </div>
      </div>

      <div className="dashboard-info">
        <div className="info-card">
          <h2 className="info-title">System Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Role:</span>
              <span className="info-value">{user?.role === 'admin' ? 'Administrator' : 'User'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className="info-value status-active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

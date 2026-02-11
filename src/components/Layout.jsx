import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Layout.css'

function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">SK – INOVISION</h1>
          <div className="user-info">
            <div className="user-avatar">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
            <div className="user-details">
              <div className="user-name">{user?.name || 'Admin'}</div>
              <div className="user-role">{user?.role === 'admin' ? 'Administrator' : 'User'}</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </NavLink>
          {user?.role === 'admin' && (
            <>
              <NavLink to="/generate-account" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="nav-icon">➕</span>
                <span>Generate Account</span>
              </NavLink>
              <NavLink to="/manage-user" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className="nav-icon">👥</span>
                <span>Manage User</span>
              </NavLink>
            </>
          )}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          <span>Logout</span>
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

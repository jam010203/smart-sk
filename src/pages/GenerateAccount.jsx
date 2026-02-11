import { useState, useEffect } from 'react'
import { getAccounts, saveAccounts } from '../lib/supabase'
import './GenerateAccount.css'

function GenerateAccount() {
  const [emailPrefix, setEmailPrefix] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const email = `${emailPrefix}@sklgu.gov.ph`
      const accounts = await getAccounts()

      if (accounts.some(acc => acc.email === email)) {
        setMessage({ type: 'error', text: 'Account already exists' })
        setLoading(false)
        return
      }

      const newAccount = {
        email,
        password,
        name: name || emailPrefix,
        createdAt: new Date().toISOString()
      }

      await saveAccounts([...accounts, newAccount])

      setMessage({ type: 'success', text: 'Account created successfully' })
      setEmailPrefix('')
      setPassword('')
      setName('')
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create account' })
    }

    setLoading(false)
  }

  return (
    <div className="generate-account">
      <div className="page-header">
        <h1 className="page-title">Generate Account</h1>
        <p className="page-subtitle">Create new user accounts</p>
      </div>

      <div className="form-container">
        <form className="account-form" onSubmit={handleSubmit}>
          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="email-input-group">
              <input
                id="email"
                type="text"
                value={emailPrefix}
                onChange={(e) => setEmailPrefix(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                placeholder="username"
                required
                disabled={loading}
              />
              <span className="email-domain">@sklgu.gov.ph</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <div className="help-section">
          <h3>Tips</h3>
          <ul>
            <li>Email format: username@sklgu.gov.ph</li>
            <li>Choose a strong password</li>
            <li>Account will sync across all browsers when Supabase is configured</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GenerateAccount

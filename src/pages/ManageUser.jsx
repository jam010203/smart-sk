import { useState, useEffect } from 'react'
import { getAccounts, saveAccounts, subscribeToAccounts } from '../lib/supabase'
import './ManageUser.css'

function ManageUser() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  useEffect(() => {
    loadAccounts()
    const unsubscribe = subscribeToAccounts((updatedAccounts) => {
      setAccounts(updatedAccounts)
    })
    return unsubscribe
  }, [])

  const loadAccounts = async () => {
    setLoading(true)
    const data = await getAccounts()
    setAccounts(data)
    setLoading(false)
  }

  const handleEdit = (account) => {
    setEditingId(account.email)
    setEditForm({ ...account })
  }

  const handleSave = async () => {
    const updated = accounts.map(acc =>
      acc.email === editingId ? editForm : acc
    )
    await saveAccounts(updated)
    setAccounts(updated)
    setEditingId(null)
  }

  const handleDelete = async (email) => {
    if (!confirm('Are you sure you want to delete this account?')) return
    const updated = accounts.filter(acc => acc.email !== email)
    await saveAccounts(updated)
    setAccounts(updated)
  }

  if (loading) {
    return (
      <div className="manage-user">
        <div className="page-header">
          <h1 className="page-title">Manage User</h1>
        </div>
        <div className="loading">Loading accounts...</div>
      </div>
    )
  }

  return (
    <div className="manage-user">
      <div className="page-header">
        <h1 className="page-title">Manage User</h1>
        <p className="page-subtitle">{accounts.length} total accounts</p>
      </div>

      {accounts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No accounts yet</h3>
          <p>Create your first account in the Generate Account page</p>
        </div>
      ) : (
        <div className="accounts-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.email}>
                  <td>
                    {editingId === account.email ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="edit-input"
                      />
                    ) : (
                      account.name
                    )}
                  </td>
                  <td>{account.email}</td>
                  <td>
                    {editingId === account.email ? (
                      <input
                        type="text"
                        value={editForm.password}
                        onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                        className="edit-input"
                      />
                    ) : (
                      <code>{account.password}</code>
                    )}
                  </td>
                  <td>{new Date(account.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="actions">
                      {editingId === account.email ? (
                        <>
                          <button onClick={handleSave} className="save-btn">Save</button>
                          <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(account)} className="edit-btn">Edit</button>
                          <button onClick={() => handleDelete(account.email)} className="delete-btn">Delete</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageUser

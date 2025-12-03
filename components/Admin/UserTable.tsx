'use client'

import { useState, useEffect } from 'react'
import { Trash2, Edit, UserPlus, X } from 'lucide-react'
import styles from './UserTable.module.css'

export default function UserTable() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'USER' })

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: '1', name: 'Emre', email: '', role: 'USER', password: '8' },
        { id: '2', name: 'Deniz', email: 'deniz@example.com', role: 'ADMIN', password: 'admin123' },
        { id: '3', name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'USER', password: 'user123' },
      ])
      setLoading(false)
    }, 500)
  }, [])

  const handleAddUser = () => {
    if (!newUser.name || !newUser.password) {
      alert('İsim ve şifre zorunludur!')
      return
    }

    const user = {
      id: 'u' + Date.now(),
      name: newUser.name,
      email: newUser.email || '',
      password: newUser.password,
      role: newUser.role
    }

    setUsers([...users, user])
    setNewUser({ name: '', email: '', password: '', role: 'USER' })
    setShowAddModal(false)
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      setUsers(users.filter(u => u.id !== userId))
    }
  }

  if (loading) return <div className={styles.loading}>Kullanıcılar yükleniyor...</div>

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Kullanıcı Yönetimi</h2>
            <p className={styles.subtitle}>{users.length} kayıtlı kullanıcı</p>
          </div>
          <button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
            <UserPlus size={18} />
            Yeni Kullanıcı
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>E-posta</th>
              <th>Şifre</th>
              <th>Rol</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>{user.name[0]}</div>
                    <span className={styles.userName}>{user.name}</span>
                  </div>
                </td>
                <td className={styles.emailCell}>{user.email || '-'}</td>
                <td className={styles.passwordCell}>{'•'.repeat(user.password.length)}</td>
                <td>
                  <span className={user.role === 'ADMIN' ? styles.badgeAdmin : styles.badgeUser}>
                    {user.role === 'ADMIN' ? 'Yönetici' : 'Kullanıcı'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Düzenle">
                      <Edit size={16} />
                    </button>
                    <button
                      className={styles.actionBtn}
                      style={{ color: 'var(--danger)' }}
                      title="Sil"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Yeni Kullanıcı Ekle</h3>
              <button onClick={() => setShowAddModal(false)} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Ad Soyad *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Kullanıcı adı"
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>E-posta (Opsiyonel)</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="ornek@email.com"
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Şifre *</label>
                <input
                  type="text"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Şifre"
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Rol</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className={styles.input}
                >
                  <option value="USER">Kullanıcı</option>
                  <option value="ADMIN">Yönetici</option>
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setShowAddModal(false)} className={styles.cancelBtn}>İptal</button>
              <button onClick={handleAddUser} className={styles.saveBtn}>Ekle</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

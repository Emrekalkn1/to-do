'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })

            if (res.ok) {
                router.push('/')
                router.refresh()
            } else {
                const data = await res.json()
                setError(data.error || 'Bir şeyler yanlış gitti')
            }
        } catch (err) {
            setError('Bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    margin: '0 auto 16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: 'white'
                }}>E</div>
                <h1 style={{ marginBottom: '8px', color: 'var(--text-main)', fontSize: '28px' }}>Hesap Oluştur</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Ücretsiz hesabınızı oluşturun</p>
            </div>

            {error && <div style={{ color: 'var(--danger)', marginBottom: '16px', textAlign: 'center', padding: '12px', background: 'rgba(226, 68, 92, 0.1)', borderRadius: '4px' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '14px' }}>Ad Soyad</label>
                    <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Adınız Soyadınız"
                        required
                        style={{ fontSize: '15px' }}
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '14px' }}>E-posta</label>
                    <input
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ornek@email.com"
                        required
                        style={{ fontSize: '15px' }}
                    />
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '14px' }}>Şifre</label>
                    <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        style={{ fontSize: '15px' }}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '15px', fontWeight: 600 }}
                    disabled={loading}
                >
                    {loading ? 'Hesap Oluşturuluyor...' : 'Kayıt Ol'}
                </button>
            </form>
            <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                Zaten hesabınız var mı? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Giriş Yapın</Link>
            </div>
        </div>
    )
}

'use client'

import { Bell, Search, HelpCircle } from 'lucide-react'
import styles from './Topbar.module.css'
import { useEffect, useState } from 'react'

export default function Topbar() {
    const [user, setUser] = useState<{ name: string, email: string } | null>(null)

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.user) setUser(data.user)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <header className={styles.topbar}>
            <div className={styles.searchBar}>
                <Search size={18} className={styles.searchIcon} />
                <input type="text" placeholder="Ara..." className={styles.searchInput} />
            </div>

            <div className={styles.actions}>
                <button className={styles.actionBtn}>
                    <HelpCircle size={20} />
                </button>
                <button className={styles.actionBtn}>
                    <Bell size={20} />
                </button>

                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                </div>
            </div>
        </header>
    )
}

'use client'

import Link from 'next/link'
import { Calendar, Users, LogOut, Layout, FileText, MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'

export default function Sidebar() {
    const pathname = usePathname()

    const links = [
        { href: '/', label: 'Çalışma Alanları', icon: Layout },
        { href: '/calendar', label: 'Takvim', icon: Calendar },
        { href: '/notes', label: 'Notlar', icon: MessageCircle },
        { href: '/proposals', label: 'Teklifler', icon: FileText },
        { href: '/admin', label: 'Yönetim', icon: Users },
    ]

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>E</div>
                <span className={styles.logoText}>eyementis</span>
            </div>

            <nav className={styles.nav}>
                {links.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.link} ${isActive ? styles.active : ''}`}
                        >
                            <Icon size={20} />
                            <span className={styles.linkLabel}>{link.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className={styles.footer}>
                <button className={styles.link} onClick={() => {
                    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
                    window.location.href = '/login'
                }}>
                    <LogOut size={20} />
                    <span className={styles.linkLabel}>Çıkış Yap</span>
                </button>
            </div>
        </aside>
    )
}

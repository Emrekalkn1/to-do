'use client'

import { useState } from 'react'
import { Calendar } from 'lucide-react'
import styles from './DateCell.module.css'

export default function DateCell({ date }: { date: string }) {
    const [currentDate, setCurrentDate] = useState(date)

    const formatDate = (dateStr: string) => {
        if (!dateStr) return null
        const d = new Date(dateStr)
        return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
    }

    return (
        <div className={styles.container}>
            <div className={styles.dateDisplay}>
                <Calendar size={14} />
                <span>{currentDate ? formatDate(currentDate) : 'Tarih Seç'}</span>
            </div>
            <input
                type="date"
                value={currentDate || ''}
                onChange={(e) => setCurrentDate(e.target.value)}
                className={styles.dateInput}
            />
        </div>
    )
}

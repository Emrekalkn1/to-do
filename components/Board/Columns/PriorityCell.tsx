'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './PriorityCell.module.css'

const PRIORITY_CONFIG: Record<string, { label: string, color: string }> = {
    'Critical': { label: '🔴 Kritik', color: '#e2445c' },
    'High': { label: '🟠 Yüksek', color: '#fdab3d' },
    'Medium': { label: '🟡 Orta', color: '#ffcb00' },
    'Low': { label: '🟢 Düşük', color: '#00c875' },
    'Very Low': { label: '⚪ Çok Düşük', color: '#c4c4c4' },
}

export default function PriorityCell({ priority }: { priority: string }) {
    const [currentPriority, setCurrentPriority] = useState(priority || 'Medium')
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const config = PRIORITY_CONFIG[currentPriority]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={styles.container} ref={dropdownRef}>
            <div
                className={styles.cell}
                style={{ backgroundColor: config.color }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {config.label}
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    {Object.entries(PRIORITY_CONFIG).map(([key, value]) => (
                        <div
                            key={key}
                            className={styles.option}
                            style={{ borderLeft: `4px solid ${value.color}` }}
                            onClick={() => {
                                setCurrentPriority(key)
                                setIsOpen(false)
                            }}
                        >
                            {value.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

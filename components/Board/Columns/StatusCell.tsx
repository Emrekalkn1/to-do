'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './StatusCell.module.css'

const STATUS_CONFIG: Record<string, { label: string, color: string }> = {
    'Done': { label: 'Tamamlandı', color: '#00c875' },
    'Finished': { label: 'Bitti', color: '#037f4c' },
    'Testing': { label: 'Test', color: '#579bfc' },
    'Updating': { label: 'Güncelleniyor', color: '#ffcb00' },
    'In Progress': { label: 'Devam Ediyor', color: '#fdab3d' },
    'Stuck': { label: 'Takıldı', color: '#e2445c' },
    'Todo': { label: 'Yapılacak', color: '#c4c4c4' },
    'In Review': { label: 'İncelemede', color: '#5559df' },
    'Waiting': { label: 'Beklemede', color: '#9cd326' },
    'Cancelled': { label: 'İptal Edildi', color: '#7e7e7e' },
}

export default function StatusCell({ status }: { status: string }) {
    const [currentStatus, setCurrentStatus] = useState(status || 'Todo')
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const config = STATUS_CONFIG[currentStatus]

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
                className={styles.statusCell}
                style={{ backgroundColor: config.color }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {config.label}
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    {Object.entries(STATUS_CONFIG).map(([key, value]) => (
                        <div
                            key={key}
                            className={styles.option}
                            style={{ borderLeft: `4px solid ${value.color}` }}
                            onClick={() => {
                                setCurrentStatus(key)
                                setIsOpen(false)
                            }}
                        >
                            <span style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '50%',
                                backgroundColor: value.color,
                                display: 'inline-block',
                                marginRight: '10px'
                            }}></span>
                            {value.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

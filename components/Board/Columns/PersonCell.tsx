'use client'

import { useState, useRef, useEffect } from 'react'
import { User as UserIcon } from 'lucide-react'
import styles from './PersonCell.module.css'

const USERS = [
    { id: '1', name: 'Deniz' },
    { id: '2', name: 'Emre' },
    { id: '3', name: 'Ahmet' },
]

export default function PersonCell({ owner }: { owner: any }) {
    const [currentOwner, setCurrentOwner] = useState(owner)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

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
                className={styles.personCell}
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentOwner ? (
                    <div className={styles.avatar}>
                        {currentOwner.name[0]}
                    </div>
                ) : (
                    <div className={styles.emptyAvatar}>
                        <UserIcon size={18} />
                    </div>
                )}
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div
                        className={styles.option}
                        onClick={() => {
                            setCurrentOwner(null)
                            setIsOpen(false)
                        }}
                    >
                        <div className={styles.emptyOptionAvatar}>
                            <UserIcon size={16} />
                        </div>
                        <span>Atanmadı</span>
                    </div>
                    {USERS.map((user) => (
                        <div
                            key={user.id}
                            className={styles.option}
                            onClick={() => {
                                setCurrentOwner(user)
                                setIsOpen(false)
                            }}
                        >
                            <div className={styles.optionAvatar}>
                                {user.name[0]}
                            </div>
                            <span>{user.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './CalendarView.module.css'

const PRIORITY_COLORS: Record<string, string> = {
    'Critical': '#333333',
    'High': '#e2445c',
    'Medium': '#fdab3d',
    'Low': '#00c875',
    'Very Low': '#c4c4c4',
    'Urgent': '#8b0000',
}

export default function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date())

    // Mock tasks from different groups
    const allTasks = [
        { id: 't1', title: 'Ana Sayfa Tasarımı', date: '2023-11-25', priority: 'High', owner: 'Deniz', color: '#579bfc' },
        { id: 't2', title: 'Kullanıcı Girişi', date: '2023-11-26', priority: 'Critical', owner: 'Emre', color: '#fdab3d' },
        { id: 't3', title: 'Veritabanı Optimizasyonu', date: '2023-12-01', priority: 'Medium', owner: 'Ahmet', color: '#a25ddc' },
        { id: 't4', title: 'API Entegrasyonu', date: '2023-12-05', priority: 'High', owner: 'Deniz', color: '#00c875' },
        { id: 't5', title: 'Test Yazılması', date: '2023-12-10', priority: 'Low', owner: 'Emre', color: '#e2445c' },
        { id: 't6', title: 'Dökümantasyon', date: '2023-12-15', priority: 'Very Low', owner: 'Ahmet', color: '#579bfc' },
    ]

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        return new Date(year, month, 1).getDay()
    }

    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)

    // Adjust for Monday start (0=Sun -> 0=Mon)
    const startOffset = firstDay === 0 ? 6 : firstDay - 1

    const days = []
    for (let i = 0; i < startOffset; i++) {
        days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const getTasksForDay = (day: number) => {
        if (!day) return []
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        return allTasks.filter(t => t.date === dateStr)
    }

    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.monthTitle}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className={styles.nav}>
                    <button onClick={prevMonth} className={styles.navBtn}><ChevronLeft size={20} /></button>
                    <button onClick={nextMonth} className={styles.navBtn}><ChevronRight size={20} /></button>
                </div>
            </div>

            <div className={styles.grid}>
                {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                    <div key={day} className={styles.dayName}>{day}</div>
                ))}

                {days.map((day, index) => {
                    const tasksForDay = getTasksForDay(day as number)
                    const isToday = day &&
                        day === new Date().getDate() &&
                        currentDate.getMonth() === new Date().getMonth() &&
                        currentDate.getFullYear() === new Date().getFullYear()

                    return (
                        <div key={index} className={`${styles.cell} ${isToday ? styles.today : ''}`}>
                            {day && (
                                <>
                                    <span className={styles.dayNumber}>{day}</span>
                                    <div className={styles.taskList}>
                                        {tasksForDay.map(task => (
                                            <div
                                                key={task.id}
                                                className={styles.task}
                                                style={{
                                                    backgroundColor: PRIORITY_COLORS[task.priority],
                                                    borderLeft: `4px solid ${task.color}`
                                                }}
                                                title={`${task.title} - ${task.owner}`}
                                            >
                                                <div className={styles.taskContent}>
                                                    <span className={styles.taskTitle}>{task.title}</span>
                                                    <span className={styles.taskOwner}>{task.owner}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className={styles.legend}>
                <h4>Öncelik Renkleri:</h4>
                <div className={styles.legendItems}>
                    {Object.entries(PRIORITY_COLORS).map(([priority, color]) => (
                        <div key={priority} className={styles.legendItem}>
                            <span className={styles.legendColor} style={{ backgroundColor: color }}></span>
                            <span>{priority}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import styles from './calendar.module.css'

const PRIORITY_COLORS: Record<string, string> = {
    'Critical': '#e2445c',
    'High': '#fdab3d',
    'Medium': '#ffcb00',
    'Low': '#00c875',
    'Very Low': '#c4c4c4',
}

const STATUS_COLORS: Record<string, string> = {
    'Done': '#00c875',
    'Finished': '#037f4c',
    'Testing': '#579bfc',
    'Updating': '#ffcb00',
    'In Progress': '#fdab3d',
    'Stuck': '#e2445c',
    'Todo': '#c4c4c4',
    'In Review': '#5559df',
    'Waiting': '#9cd326',
    'Cancelled': '#7e7e7e',
}

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterPriority, setFilterPriority] = useState('all')
    const [filterPerson, setFilterPerson] = useState('all')

    // Real tasks from board
    const allTasks = [
        { id: 't1', title: 'Ana Sayfa Tasarımı', date: '2023-11-25', priority: 'High', status: 'Done', owner: { id: '1', name: 'Deniz' }, color: '#579bfc' },
        { id: 't2', title: 'Kullanıcı Girişi Ekle', date: '2023-11-26', priority: 'Critical', status: 'In Progress', owner: { id: '2', name: 'Emre' }, color: '#fdab3d' },
        { id: 't3', title: 'Veritabanı Optimizasyonu', date: '2023-12-01', priority: 'Medium', status: 'Stuck', owner: { id: '3', name: 'Ahmet' }, color: '#a25ddc' },
        { id: 't4', title: 'API Entegrasyonu', date: '2023-12-05', priority: 'High', status: 'Testing', owner: { id: '1', name: 'Deniz' }, color: '#00c875' },
        { id: 't5', title: 'Test Yazılması', date: '2023-12-10', priority: 'Low', status: 'Todo', owner: { id: '2', name: 'Emre' }, color: '#e2445c' },
        { id: 't6', title: 'Dökümantasyon', date: '2023-12-15', priority: 'Very Low', status: 'Waiting', owner: { id: '3', name: 'Ahmet' }, color: '#579bfc' },
    ]

    const getFilteredTasks = () => {
        let filtered = [...allTasks]

        if (filterStatus !== 'all') {
            filtered = filtered.filter(t => t.status === filterStatus)
        }

        if (filterPriority !== 'all') {
            filtered = filtered.filter(t => t.priority === filterPriority)
        }

        if (filterPerson !== 'all') {
            filtered = filtered.filter(t => t.owner.id === filterPerson)
        }

        return filtered
    }

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
        return getFilteredTasks().filter(t => t.date === dateStr)
    }

    const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']

    return (
        <div className={styles.container}>
            <div className={styles.topBar}>
                <div className={styles.header}>
                    <h2 className={styles.monthTitle}>
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <div className={styles.nav}>
                        <button onClick={prevMonth} className={styles.navBtn}><ChevronLeft size={20} /></button>
                        <button onClick={nextMonth} className={styles.navBtn}><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <Filter size={16} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value="all">Tüm Durumlar</option>
                            <option value="Done">Tamamlandı</option>
                            <option value="Finished">Bitti</option>
                            <option value="Testing">Test</option>
                            <option value="Updating">Güncelleniyor</option>
                            <option value="In Progress">Devam Ediyor</option>
                            <option value="Stuck">Takıldı</option>
                            <option value="Todo">Yapılacak</option>
                            <option value="In Review">İncelemede</option>
                            <option value="Waiting">Beklemede</option>
                            <option value="Cancelled">İptal Edildi</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <Filter size={16} />
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value="all">Tüm Öncelikler</option>
                            <option value="Critical">Kritik</option>
                            <option value="High">Yüksek</option>
                            <option value="Medium">Orta</option>
                            <option value="Low">Düşük</option>
                            <option value="Very Low">Çok Düşük</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <Filter size={16} />
                        <select
                            value={filterPerson}
                            onChange={(e) => setFilterPerson(e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value="all">Tüm Kişiler</option>
                            <option value="1">Deniz</option>
                            <option value="2">Emre</option>
                            <option value="3">Ahmet</option>
                        </select>
                    </div>
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
                                                title={`${task.title} - ${task.owner.name} - ${task.status}`}
                                            >
                                                <div className={styles.taskContent}>
                                                    <span className={styles.taskTitle}>{task.title}</span>
                                                    <span className={styles.taskOwner}>{task.owner.name}</span>
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

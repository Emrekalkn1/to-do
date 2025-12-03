'use client'

import { useState, useEffect } from 'react'
import { Plus, Filter, ArrowUpDown } from 'lucide-react'
import Group from './Group'
import styles from './Board.module.css'

export default function Board() {
    const [boardData, setBoardData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [newGroupName, setNewGroupName] = useState('')
    const [isAddingGroup, setIsAddingGroup] = useState(false)
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterPriority, setFilterPriority] = useState('all')
    const [filterPerson, setFilterPerson] = useState('all')
    const [sortBy, setSortBy] = useState('none')

    useEffect(() => {
        setTimeout(() => {
            setBoardData({
                id: '1',
                title: 'Ana Pano',
                groups: [
                    {
                        id: 'g1',
                        title: 'Frontend Geliştirme',
                        color: '#579bfc',
                        tasks: [
                            { id: 't1', title: 'Ana Sayfa Tasarımı', status: 'Done', priority: 'High', dueDate: '2023-11-25', owner: { id: '1', name: 'Deniz' } },
                            { id: 't2', title: 'Kullanıcı Girişi Ekle', status: 'In Progress', priority: 'Critical', dueDate: '2023-11-26', owner: { id: '2', name: 'Emre' } },
                        ]
                    },
                    {
                        id: 'g2',
                        title: 'Backend Geliştirme',
                        color: '#a25ddc',
                        tasks: [
                            { id: 't3', title: 'Veritabanı Optimizasyonu', status: 'Stuck', priority: 'Medium', dueDate: '2023-12-01', owner: { id: '3', name: 'Ahmet' } },
                        ]
                    }
                ]
            })
            setLoading(false)
        }, 500)
    }, [])

    const handleAddGroup = () => {
        if (!newGroupName.trim()) return

        const colors = ['#579bfc', '#a25ddc', '#00c875', '#fdab3d', '#e2445c']
        const randomColor = colors[Math.floor(Math.random() * colors.length)]

        const newGroup = {
            id: 'g' + Date.now(),
            title: newGroupName,
            color: randomColor,
            tasks: []
        }

        setBoardData({
            ...boardData,
            groups: [...boardData.groups, newGroup]
        })

        setNewGroupName('')
        setIsAddingGroup(false)
    }

    const getFilteredGroups = () => {
        if (!boardData) return []

        return boardData.groups.map((group: any) => {
            let filteredTasks = [...group.tasks]

            // Filter by status
            if (filterStatus !== 'all') {
                filteredTasks = filteredTasks.filter((task: any) => task.status === filterStatus)
            }

            // Filter by priority
            if (filterPriority !== 'all') {
                filteredTasks = filteredTasks.filter((task: any) => task.priority === filterPriority)
            }

            // Filter by person
            if (filterPerson !== 'all') {
                filteredTasks = filteredTasks.filter((task: any) => task.owner?.id === filterPerson)
            }

            // Sort
            if (sortBy === 'priority') {
                const priorityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3, 'Very Low': 4 }
                filteredTasks.sort((a: any, b: any) =>
                    (priorityOrder[a.priority as keyof typeof priorityOrder] || 5) -
                    (priorityOrder[b.priority as keyof typeof priorityOrder] || 5)
                )
            } else if (sortBy === 'date') {
                filteredTasks.sort((a: any, b: any) => {
                    if (!a.dueDate) return 1
                    if (!b.dueDate) return -1
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                })
            }

            return { ...group, tasks: filteredTasks }
        })
    }

    if (loading) return <div className={styles.loading}>Pano yükleniyor...</div>

    return (
        <div className={styles.boardContainer}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>{boardData.title}</h1>
                    <p className={styles.description}>Projelerinizi ve görevlerinizi yönetin.</p>
                </div>

                <div className={styles.controls}>
                    <div className={styles.filterGroup}>
                        <Filter size={18} />
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
                        <Filter size={18} />
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
                        <Filter size={18} />
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

                    <div className={styles.filterGroup}>
                        <ArrowUpDown size={18} />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value="none">Sıralama Yok</option>
                            <option value="priority">Önceliğe Göre</option>
                            <option value="date">Tarihe Göre</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.groupsContainer}>
                {getFilteredGroups().map((group: any) => (
                    <Group key={group.id} group={group} boardData={boardData} setBoardData={setBoardData} />
                ))}

                {isAddingGroup ? (
                    <div className={styles.addGroupForm}>
                        <input
                            type="text"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddGroup()}
                            placeholder="Grup adını girin..."
                            className={styles.groupInput}
                            autoFocus
                        />
                        <div className={styles.addGroupButtons}>
                            <button onClick={handleAddGroup} className={styles.confirmBtn}>Ekle</button>
                            <button onClick={() => { setIsAddingGroup(false); setNewGroupName(''); }} className={styles.cancelBtn}>İptal</button>
                        </div>
                    </div>
                ) : (
                    <button className={styles.addGroupBtn} onClick={() => setIsAddingGroup(true)}>
                        <Plus size={18} />
                        Yeni Grup Ekle
                    </button>
                )}
            </div>
        </div>
    )
}

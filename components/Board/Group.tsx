'use client'

import { useState } from 'react'
import { ChevronDown, MoreHorizontal, Plus } from 'lucide-react'
import TaskRow from './TaskRow'
import styles from './Group.module.css'

export default function Group({ group, boardData, setBoardData }: { group: any, boardData: any, setBoardData: any }) {
    const [collapsed, setCollapsed] = useState(false)
    const [tasks, setTasks] = useState(group.tasks)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [isAddingTask, setIsAddingTask] = useState(false)

    const handleAddTask = () => {
        if (!newTaskTitle.trim()) return

        const newTask = {
            id: 't' + Date.now(),
            title: newTaskTitle,
            status: 'Todo',
            priority: 'Medium',
            dueDate: null,
            owner: null
        }

        const updatedTasks = [...tasks, newTask]
        setTasks(updatedTasks)

        // Update board data
        const updatedGroups = boardData.groups.map((g: any) =>
            g.id === group.id ? { ...g, tasks: updatedTasks } : g
        )
        setBoardData({ ...boardData, groups: updatedGroups })

        setNewTaskTitle('')
        setIsAddingTask(false)
    }

    return (
        <div className={styles.group}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <button
                        className={styles.collapseBtn}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ color: group.color }}
                    >
                        <ChevronDown size={20} className={collapsed ? styles.rotated : ''} />
                    </button>
                    <h2 className={styles.title} style={{ color: group.color }}>{group.title}</h2>
                    <span className={styles.count}>{tasks.length} öğe</span>
                </div>
                <div className={styles.headerRight}>
                    <button className={styles.menuBtn}><MoreHorizontal size={18} /></button>
                </div>
            </div>

            {!collapsed && (
                <div className={styles.table}>
                    <div className={styles.tableHeader}>
                        <div className={styles.colName} style={{ borderLeft: `6px solid ${group.color}` }}>Görev</div>
                        <div className={styles.colPerson}>Kişi</div>
                        <div className={styles.colStatus}>Durum</div>
                        <div className={styles.colPriority}>Öncelik</div>
                        <div className={styles.colDate}>Tarih</div>
                    </div>

                    <div className={styles.rows}>
                        {tasks.map((task: any) => (
                            <TaskRow key={task.id} task={task} groupColor={group.color} />
                        ))}

                        {isAddingTask ? (
                            <div className={styles.addRow}>
                                <div className={styles.addRowInputContainer} style={{ borderLeft: `6px solid ${group.color}` }}>
                                    <input
                                        type="text"
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                                        onBlur={() => {
                                            if (!newTaskTitle.trim()) setIsAddingTask(false)
                                        }}
                                        placeholder="Görev başlığını girin..."
                                        className={styles.addRowInput}
                                        autoFocus
                                    />
                                </div>
                                <div className={styles.colPerson}></div>
                                <div className={styles.colStatus}></div>
                                <div className={styles.colPriority}></div>
                                <div className={styles.colDate}></div>
                            </div>
                        ) : (
                            <div className={styles.addRow}>
                                <div
                                    className={styles.addRowInputContainer}
                                    style={{ borderLeft: `6px solid ${group.color}` }}
                                    onClick={() => setIsAddingTask(true)}
                                >
                                    <button className={styles.addRowBtn}>
                                        <Plus size={16} />
                                        Görev Ekle
                                    </button>
                                </div>
                                <div className={styles.colPerson}></div>
                                <div className={styles.colStatus}></div>
                                <div className={styles.colPriority}></div>
                                <div className={styles.colDate}></div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

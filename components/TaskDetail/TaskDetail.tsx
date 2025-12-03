'use client'

import { X, CheckSquare, MessageSquare, Plus, Square, Calendar, AlertCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import styles from './TaskDetail.module.css'

const PRIORITY_OPTIONS = ['Critical', 'High', 'Medium', 'Low', 'Very Low', 'Urgent']
const PRIORITY_COLORS: Record<string, string> = {
    'Critical': '#333333',
    'High': '#e2445c',
    'Medium': '#fdab3d',
    'Low': '#00c875',
    'Very Low': '#c4c4c4',
    'Urgent': '#8b0000',
}

function TaskDetailContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const taskId = searchParams.get('taskId')
    const [task, setTask] = useState<any>(null)
    const [newSubtask, setNewSubtask] = useState({ title: '', dueDate: '', priority: 'Medium' })
    const [newComment, setNewComment] = useState('')
    const [isAddingSubtask, setIsAddingSubtask] = useState(false)

    useEffect(() => {
        if (taskId) {
            setTask({
                id: taskId,
                title: 'Örnek Görev Başlığı',
                subtasks: [
                    { id: 's1', title: 'Alt görev 1', isCompleted: false, dueDate: '2023-12-15', priority: 'High' },
                    { id: 's2', title: 'Alt görev 2', isCompleted: true, dueDate: '2023-12-10', priority: 'Medium' },
                ],
                comments: [
                    { id: 'c1', content: 'Bu bir test yorumudur', createdAt: new Date().toISOString(), user: { name: 'Deniz' } }
                ]
            })
        } else {
            setTask(null)
        }
    }, [taskId])

    const handleAddSubtask = () => {
        if (!newSubtask.title.trim()) return

        const subtask = {
            id: 's' + Date.now(),
            title: newSubtask.title,
            isCompleted: false,
            dueDate: newSubtask.dueDate,
            priority: newSubtask.priority
        }

        setTask({
            ...task,
            subtasks: [...task.subtasks, subtask]
        })

        setNewSubtask({ title: '', dueDate: '', priority: 'Medium' })
        setIsAddingSubtask(false)
    }

    const handleToggleSubtask = (subtaskId: string) => {
        setTask({
            ...task,
            subtasks: task.subtasks.map((st: any) =>
                st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
            )
        })
    }

    const handleAddComment = () => {
        if (!newComment.trim()) return

        const comment = {
            id: 'c' + Date.now(),
            content: newComment,
            createdAt: new Date().toISOString(),
            user: { name: 'Deniz' }
        }

        setTask({
            ...task,
            comments: [...task.comments, comment]
        })

        setNewComment('')
    }

    if (!taskId || !task) return null

    const close = () => {
        router.push('/')
    }

    return (
        <div className={styles.overlay} onClick={close}>
            <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{task.title}</h2>
                    <button onClick={close} className={styles.closeBtn}><X size={24} /></button>
                </div>

                <div className={styles.tabs}>
                    <button className={`${styles.tab} ${styles.activeTab}`}>Güncellemeler</button>
                    <button className={styles.tab}>Dosyalar</button>
                    <button className={styles.tab}>Aktivite Geçmişi</button>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <CheckSquare size={18} />
                            Alt Görevler ({task.subtasks.filter((s: any) => s.isCompleted).length}/{task.subtasks.length})
                        </h3>
                        <div className={styles.subtaskList}>
                            {task.subtasks.map((sub: any) => (
                                <div key={sub.id} className={styles.subtask}>
                                    <button
                                        className={sub.isCompleted ? styles.checkboxChecked : styles.checkbox}
                                        onClick={() => handleToggleSubtask(sub.id)}
                                    >
                                        {sub.isCompleted ? <CheckSquare size={16} /> : <Square size={16} />}
                                    </button>
                                    <div className={styles.subtaskContent}>
                                        <span className={sub.isCompleted ? styles.completedText : styles.subtaskTitle}>{sub.title}</span>
                                        <div className={styles.subtaskMeta}>
                                            {sub.dueDate && (
                                                <span className={styles.subtaskDate}>
                                                    <Calendar size={12} />
                                                    {new Date(sub.dueDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                                                </span>
                                            )}
                                            {sub.priority && (
                                                <span
                                                    className={styles.subtaskPriority}
                                                    style={{ backgroundColor: PRIORITY_COLORS[sub.priority] }}
                                                >
                                                    {sub.priority}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isAddingSubtask ? (
                                <div className={styles.addSubtaskForm}>
                                    <input
                                        type="text"
                                        value={newSubtask.title}
                                        onChange={(e) => setNewSubtask({ ...newSubtask, title: e.target.value })}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
                                        placeholder="Alt görev başlığını girin..."
                                        className={styles.addSubtaskInput}
                                        autoFocus
                                    />
                                    <div className={styles.subtaskFormRow}>
                                        <input
                                            type="date"
                                            value={newSubtask.dueDate}
                                            onChange={(e) => setNewSubtask({ ...newSubtask, dueDate: e.target.value })}
                                            className={styles.dateInput}
                                        />
                                        <select
                                            value={newSubtask.priority}
                                            onChange={(e) => setNewSubtask({ ...newSubtask, priority: e.target.value })}
                                            className={styles.prioritySelect}
                                        >
                                            {PRIORITY_OPTIONS.map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={styles.subtaskFormButtons}>
                                        <button onClick={handleAddSubtask} className={styles.saveBtn}>Ekle</button>
                                        <button onClick={() => { setNewSubtask({ title: '', dueDate: '', priority: 'Medium' }); setIsAddingSubtask(false); }} className={styles.cancelSubtaskBtn}>İptal</button>
                                    </div>
                                </div>
                            ) : (
                                <button className={styles.addSubtaskBtn} onClick={() => setIsAddingSubtask(true)}>
                                    <Plus size={16} />
                                    Alt Görev Ekle
                                </button>
                            )}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <MessageSquare size={18} />
                            Yorumlar ({task.comments.length})
                        </h3>

                        <div className={styles.commentInputContainer}>
                            <textarea
                                placeholder="Bir güncelleme yaz..."
                                className={styles.commentInput}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button className={styles.postBtn} onClick={handleAddComment}>Gönder</button>
                        </div>

                        <div className={styles.commentList}>
                            {task.comments.map((comment: any) => (
                                <div key={comment.id} className={styles.comment}>
                                    <div className={styles.commentAvatar}>{comment.user.name[0]}</div>
                                    <div className={styles.commentContent}>
                                        <div className={styles.commentHeader}>
                                            <span className={styles.commentAuthor}>{comment.user.name}</span>
                                            <span className={styles.commentTime}>{new Date(comment.createdAt).toLocaleString('tr-TR')}</span>
                                        </div>
                                        <p className={styles.commentText}>{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function TaskDetail() {
    return (
        <Suspense fallback={null}>
            <TaskDetailContent />
        </Suspense>
    )
}

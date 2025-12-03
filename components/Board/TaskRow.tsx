'use client'

import { MessageSquare } from 'lucide-react'
import StatusCell from './Columns/StatusCell'
import PriorityCell from './Columns/PriorityCell'
import DateCell from './Columns/DateCell'
import PersonCell from './Columns/PersonCell'
import styles from './TaskRow.module.css'
import { useRouter } from 'next/navigation'

export default function TaskRow({ task, groupColor }: { task: any, groupColor: string }) {
    const router = useRouter()

    return (
        <div className={styles.row}>
            <div className={styles.colName} style={{ borderLeft: `6px solid ${groupColor}` }}>
                <div className={styles.nameContent}>
                    <input type="text" defaultValue={task.title} className={styles.nameInput} />
                    <button
                        className={styles.actionBtn}
                        onClick={() => router.push(`?taskId=${task.id}`)}
                        title="Görev Detayları"
                    >
                        <MessageSquare size={20} />
                    </button>
                </div>
            </div>

            <div className={styles.colPerson}>
                <PersonCell owner={task.owner} />
            </div>

            <div className={styles.colStatus}>
                <StatusCell status={task.status} />
            </div>

            <div className={styles.colPriority}>
                <PriorityCell priority={task.priority} />
            </div>

            <div className={styles.colDate}>
                <DateCell date={task.dueDate} />
            </div>
        </div>
    )
}

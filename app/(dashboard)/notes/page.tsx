'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import styles from './notes.module.css'

export default function NotesPage() {
    const [notes, setNotes] = useState([
        { id: '1', content: 'Proje başlatıldı, ilk sprint planlandı.', author: 'Deniz', createdAt: '2023-11-24T10:30:00' },
        { id: '2', content: 'Design mockup\'ları hazır, review bekliyor.', author: 'Emre', createdAt: '2023-11-24T14:15:00' },
        { id: '3', content: 'API endpoint\'leri tamamlandı, test edilmeli.', author: 'Ahmet', createdAt: '2023-11-24T16:45:00' },
    ])
    const [newNote, setNewNote] = useState('')

    const handleAddNote = () => {
        if (!newNote.trim()) return

        const note = {
            id: 'n' + Date.now(),
            content: newNote,
            author: 'Deniz', // Current user
            createdAt: new Date().toISOString()
        }

        setNotes([...notes, note])
        setNewNote('')
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Notlar</h1>
                <p className={styles.subtitle}>Ekip notları ve güncellemeler</p>
            </div>

            <div className={styles.chatContainer}>
                <div className={styles.messages}>
                    {notes.map((note) => (
                        <div key={note.id} className={styles.message}>
                            <div className={styles.messageAvatar}>
                                {note.author[0]}
                            </div>
                            <div className={styles.messageContent}>
                                <div className={styles.messageHeader}>
                                    <span className={styles.messageAuthor}>{note.author}</span>
                                    <span className={styles.messageTime}>
                                        {new Date(note.createdAt).toLocaleString('tr-TR', {
                                            day: 'numeric',
                                            month: 'short',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <p className={styles.messageText}>{note.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.inputContainer}>
                    <textarea
                        className={styles.input}
                        placeholder="Bir not ekle..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleAddNote()
                            }
                        }}
                    />
                    <button
                        className={styles.sendBtn}
                        onClick={handleAddNote}
                        disabled={!newNote.trim()}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

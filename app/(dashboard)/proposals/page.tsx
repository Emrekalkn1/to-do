'use client'

import { useState } from 'react'
import { Plus, X, FileText, Edit, Trash2 } from 'lucide-react'
import styles from './proposals.module.css'

export default function ProposalsPage() {
    const [proposals, setProposals] = useState([
        {
            id: '1',
            projectName: 'Web Sitesi Yenileme',
            proposalDate: '2023-12-01',
            brand: 'ABC Şirketi',
            description: 'Kurumsal web sitesi tasarımı ve geliştirmesi',
            notes: 'İlk görüşme 15 Aralık\'ta planlandı'
        },
        {
            id: '2',
            projectName: 'Mobil Uygulama',
            proposalDate: '2023-12-05',
            brand: 'XYZ Ltd',
            description: 'iOS ve Android için e-ticaret mobil uygulaması',
            notes: 'Bütçe görüşmesi devam ediyor'
        },
    ])
    const [showModal, setShowModal] = useState(false)
    const [editingProposal, setEditingProposal] = useState<any>(null)
    const [formData, setFormData] = useState({
        projectName: '',
        proposalDate: '',
        brand: '',
        description: '',
        notes: ''
    })

    const openAddModal = () => {
        setEditingProposal(null)
        setFormData({ projectName: '', proposalDate: '', brand: '', description: '', notes: '' })
        setShowModal(true)
    }

    const openEditModal = (proposal: any) => {
        setEditingProposal(proposal)
        setFormData({ ...proposal })
        setShowModal(true)
    }

    const handleSaveProposal = () => {
        if (!formData.projectName || !formData.brand) {
            alert('Proje adı ve marka zorunludur!')
            return
        }

        if (editingProposal) {
            // Update existing
            setProposals(proposals.map(p => p.id === editingProposal.id ? { ...formData, id: p.id } : p))
        } else {
            // Add new
            const proposal = {
                id: 'p' + Date.now(),
                ...formData
            }
            setProposals([...proposals, proposal])
        }

        setFormData({ projectName: '', proposalDate: '', brand: '', description: '', notes: '' })
        setShowModal(false)
        setEditingProposal(null)
    }

    const handleDeleteProposal = (id: string) => {
        if (confirm('Bu teklifi silmek istediğinizden emin misiniz?')) {
            setProposals(proposals.filter(p => p.id !== id))
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Teklifler</h1>
                        <p className={styles.subtitle}>{proposals.length} teklif</p>
                    </div>
                    <button className={styles.addBtn} onClick={openAddModal}>
                        <Plus size={20} />
                        Yeni Teklif
                    </button>
                </div>

                <div className={styles.proposalsList}>
                    {proposals.map((proposal) => (
                        <div key={proposal.id} className={styles.proposalCard}>
                            <div className={styles.proposalIcon}>
                                <FileText size={28} />
                            </div>
                            <div className={styles.proposalContent}>
                                <h3 className={styles.proposalTitle}>{proposal.projectName}</h3>
                                <div className={styles.proposalMeta}>
                                    <span className={styles.metaItem}>
                                        <strong>Marka:</strong> {proposal.brand}
                                    </span>
                                    {proposal.proposalDate && (
                                        <span className={styles.metaItem}>
                                            <strong>Tarih:</strong> {new Date(proposal.proposalDate).toLocaleDateString('tr-TR')}
                                        </span>
                                    )}
                                </div>
                                {proposal.description && (
                                    <p className={styles.proposalDesc}>{proposal.description}</p>
                                )}
                                {proposal.notes && (
                                    <div className={styles.proposalNotes}>
                                        <strong>Notlar:</strong> {proposal.notes}
                                    </div>
                                )}
                            </div>
                            <div className={styles.proposalActions}>
                                <button
                                    className={styles.editBtn}
                                    onClick={() => openEditModal(proposal)}
                                    title="Düzenle"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={() => handleDeleteProposal(proposal.id)}
                                    title="Sil"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>{editingProposal ? 'Teklifi Düzenle' : 'Yeni Teklif Ekle'}</h3>
                            <button onClick={() => setShowModal(false)} className={styles.closeBtn}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label>Proje Adı *</label>
                                <input
                                    type="text"
                                    value={formData.projectName}
                                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                    placeholder="Proje adını girin"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Marka *</label>
                                <input
                                    type="text"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    placeholder="Marka adı"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Teklif Tarihi</label>
                                <input
                                    type="date"
                                    value={formData.proposalDate}
                                    onChange={(e) => setFormData({ ...formData, proposalDate: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Açıklama</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Teklif açıklaması"
                                    className={styles.textarea}
                                    rows={3}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Notlar</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    placeholder="Ek notlar"
                                    className={styles.textarea}
                                    rows={2}
                                />
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={() => setShowModal(false)} className={styles.cancelBtn}>İptal</button>
                            <button onClick={handleSaveProposal} className={styles.saveBtn}>
                                {editingProposal ? 'Güncelle' : 'Ekle'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

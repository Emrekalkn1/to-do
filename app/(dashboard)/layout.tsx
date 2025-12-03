import Sidebar from '@/components/Sidebar/Sidebar'
import Topbar from '@/components/Topbar/Topbar'
import TaskDetail from '@/components/TaskDetail/TaskDetail'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '240px', display: 'flex', flexDirection: 'column' }}>
                <Topbar />
                <main style={{ flex: 1, padding: '24px', overflowY: 'auto', background: 'var(--bg-secondary)' }}>
                    {children}
                </main>
                <TaskDetail />
            </div>
        </div>
    )
}

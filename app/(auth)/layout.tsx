export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
                {children}
            </div>
        </div>
    )
}

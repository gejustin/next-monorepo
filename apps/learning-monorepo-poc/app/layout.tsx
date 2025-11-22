import './global.css';
import { Sidebar, Topbar } from '@learning-monorepo-poc/ui';

export const metadata = {
  title: 'Handshake AI Learning',
  description: 'Master new skills with interactive modules.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <Topbar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

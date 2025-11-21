import './global.css';
import { Navigation } from '@learning-monorepo-poc/ui';

export const metadata = {
  title: 'Micro-Academy - Learning Platform',
  description: 'Explore learning modules and enhance your skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

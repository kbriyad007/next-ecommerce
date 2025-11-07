// app/layout.tsx
import './globals.css';

export const metadata = { title: 'StudentHub', description: 'AI Landing Page SaaS' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 shadow-md bg-white flex justify-between items-center">
          <h1 className="font-bold text-xl">StudentHub</h1>
          <nav>
            <a href="/login" className="mr-4">Login</a>
            <a href="/signup">Signup</a>
          </nav>
        </header>
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
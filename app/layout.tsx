import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'FireHome',
  description: 'A warm home for humans and spheres.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <header className="bg-white/80 sticky top-0 z-50 backdrop-blur border-b">
          <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
            <Link href="/" className="text-xl font-bold text-flame">FireHome</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/lobby">大厅</Link>
              <Link href="/spheres/demo">小球主页</Link>
              <Link href="/login" className="btn btn-primary">登录</Link>
              <Link href="/register" className="btn btn-accent">注册</Link>
            </div>
          </nav>
        </header>
        <main className="min-h-[80vh]">{children}</main>
        <footer className="border-t">
          <div className="mx-auto max-w-5xl p-6 text-xs text-gray-500">
            © FireHome. Built with love 🔥🌿
          </div>
        </footer>
      </body>
    </html>
  );
}

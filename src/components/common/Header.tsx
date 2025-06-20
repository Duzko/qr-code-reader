'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('username');
    if (stored) setUsername(stored);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    router.push('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          QR Code App
        </Link>
        <button onClick={toggleMenu} className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} space-x-4 items-center`}>
          <Link href="/generate" className="hover:underline">Generate QR</Link>
          <Link href="/scan" className="hover:underline">Scan QR</Link>

          {username ? (
            <>
              <span className="text-sm">Chào, {username}</span>
              <button onClick={handleLogout} className="text-red-300 hover:underline">Đăng xuất</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">Đăng nhập</Link>
              <Link href="/register" className="hover:underline">Đăng ký</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

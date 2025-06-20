'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../common/Message';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setMessage({ type: 'success', text: 'Đăng nhập thành công!' });
        setTimeout(() => router.push('/'), 1000);
    } else setMessage({ type: 'error', text: data.error || 'Đăng nhập thất bại' });
  }

  return (
    <div className="w-80 bg-white rounded-3xl border border-black p-6 flex flex-col items-center space-y-4 shadow-lg">
      <h2 className="text-2xl font-semibold">Đăng nhập</h2>
      {message && <Alert type={message.type} text={message.text} onClose={() => setMessage(null)} />}
      <form onSubmit={handleLogin} className="w-full flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-black rounded-full text-black outline-none"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-black rounded-full text-black outline-none"
        />
        <button
          type="submit"
          className="w-32 self-center py-2 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 transition"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
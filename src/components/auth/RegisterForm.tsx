'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Alert from '../common/Message';
import { set } from 'mongoose';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const router = useRouter();

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.success) {
          setMessage({ type: 'success', text: 'Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.' });
          setTimeout(() => router.push('/login'), 1000);
        }
        else setMessage({ type: 'error', text: data.error || 'Đăng ký thất bại' });
    }

    return (
    <div className="w-80 bg-white rounded-3xl border border-black p-6 flex flex-col items-center space-y-4 shadow-lg">
      <h2 className="text-2xl font-semibold">Đăng ký</h2>
      {message && <Alert type={message.type} text={message.text} onClose={() => setMessage(null)} />}
      <form onSubmit={handleRegister} className="w-full flex flex-col space-y-3">
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
          Đăng ký
        </button>
      </form>
    </div>
    );
}


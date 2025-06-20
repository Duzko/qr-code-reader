'use client';
import { useEffect, useState } from 'react';

interface AlertProps {
  type: 'success' | 'error';
  text: string;
  onClose?: () => void;
}

export default function Alert({ type, text, onClose }: AlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white transition-all duration-300 ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      {text}
    </div>
  );
}

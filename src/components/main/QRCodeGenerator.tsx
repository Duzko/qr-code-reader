'use client';

import { useState,useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

interface QRCodeGeneratorProps {
    initialValue: string;
}

export default function QRCodeGenerator({initialValue = ''}: QRCodeGeneratorProps) {
    const [value, setValue] = useState(initialValue);
    const [inputValue, setInputValue] = useState(initialValue);
    const qrRef = useRef<HTMLDivElement>(null);

    const handleGenerate = () => {
        setValue(inputValue);
    };

    const handleDownload = async () => {
        if (qrRef.current === null) return;
        try {
            const dataUrl = await toPng(qrRef.current);
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = dataUrl;
            link.click();
        } catch (err) {
            alert('Lỗi khi tải xuống mã QR: ' + err);
        }
    }

    
    return (
        <div className="flex flex-col items-center space-y-4">
            <input
                type='text'
                className='p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-80 text-black'
                placeholder='Nhập nội dung mã QR'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button
                onClick={handleGenerate}
                className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'
            >
                Tạo mã QR
            </button>

            {value && (
                <>
                <div ref={qrRef} className="p-6 bg-white rounded-lg shadow-xl">
                    <QRCode value={value} size={256} level='H' />
                </div>
                <button
                    onClick={handleDownload}
                    className="mt-2 px-5 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
>
                    Tải mã QR
                </button>
                </>
            )}
        </div>
    );
}
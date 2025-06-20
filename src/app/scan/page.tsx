'use client';

import { useState } from "react";
import QRCodeScanner from "@/components/main/QRCodeScanner";
import Header from "@/components/common/Header";
import Head from "next/head";
import Alert from "@/components/common/Message";


export default function ScanPage() {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [showScanner, setShowScanner] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleScan = (data: string | null) => {
        if (data) {
            setScanResult(data);
        } else {
            setScanResult("Không có dữ liệu quét được");
        }
    };

    const handleError = (error: Error) => {
        console.error("QR Code Scanner Error:", error);
        setMessage({ type: 'error', text: `Lỗi quét mã QR: ${error.message}` });
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <>
            <Head>
                <title>QR Code Scanner</title>
                <meta name="description" content="Scan QR codes easily" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">Quét mã QR</h1>
            {message && <Alert type={message.type} text={message.text} onClose={() => setMessage(null)} />}
             <button
                onClick={() => setShowScanner(!showScanner)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                {showScanner ? "Tắt camera": "Bật camera"}
            </button>
            {showScanner &&
                <div className="mt-6">
                <QRCodeScanner onScan={handleScan} onError={handleError} />
                </div>
            }
            {scanResult && (
                <div className="mt-6 w-full max-w-md p-4 bg-white rounded-lg shadow text-center">
                    <h2 className="text-xl font-semibold">Kết quả quét:</h2>
                    <p className="break-words text-gray-700">{scanResult}</p>
                </div>
            )}

        </div>
        </>
    );
}
'use client';

import { useState } from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

interface QRCodeScannerProps {
    onScan: (data: string | null) => void;
    onError?: (error: Error) => void;
}

export default function QRCodeScanner({ onScan, onError }: QRCodeScannerProps) {
    const [error, setError] = useState<string|null>(null);

    const handleDecode = (code: IDetectedBarcode[]) => {
        const result = code.length > 0 ? code[0].rawValue : null;
        onScan(result);
        setError(null);
    }

    const handleError = (error: unknown) => {
        if (error instanceof Error){
            console.error(error);
            setError(error.message);
            if (onError) onError(error);
        } else {
            console.error("Unknown error", error);
            setError("An unknown error occurred.");
            if (onError) onError(new Error("Unknown error"));
    }
}

    return (
        <div className="relative w-full max-w-sm aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <Scanner
                onScan={handleDecode}
                onError={handleError}
                styles={{
                container: { width: '100%', height: '100%' },
                video: { width: '100%', height: '100%' },
                }}
                scanDelay={500}
            />
            {error && (
                <p className="absolute bottom-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
                    {error}
                </p>
            )}
        </div>
    );

}
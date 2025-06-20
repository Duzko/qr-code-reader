import QRCodeGenerator from "@/components/main/QRCodeGenerator";
import Header from "@/components/common/Header";
import Head from "next/head";


export default function GeneratePage() {
    return (
        <>
            <Head>
                <title>QR Code Generator</title>
                <meta name="description" content="Generate QR codes easily" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">Tạo mã QR</h1>
            <QRCodeGenerator initialValue="" />
        </div>
        </>
    );
}
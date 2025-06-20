import Link from 'next/link';
import Header from '@/components/common/Header';

export default function Home() {
  return (
    <>
      <head>
        <title>QR Code App</title>
        <meta name="description" content="A simple QR code generator and scanner app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Header />

    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 text-black">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-8">
        QR Code App
      </h1>

      <div className="flex space-x-8">
        <Link 
          href="/generate"
          className="flex flex-col items-center justify-center p-8 bg-blue-600 text-white rounded-lg shadow-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105 w-64 h-40"
        >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 4.5h16.5M3.75 9h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
            <span className="text-2xl font-bold">Generate QR</span>
        </Link>

        <Link 
          href="/scan"
          className="flex flex-col items-center justify-center p-8 bg-green-600 text-white rounded-lg shadow-xl hover:bg-green-700 transition duration-300 transform hover:scale-105 w-64 h-40"
        >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
            <span className="text-2xl font-bold">Scan QR</span>
        </Link>
      </div>
    </main>

    </>
  );
}
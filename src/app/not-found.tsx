// pages/404.tsx or app/not-found.tsx
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-00 text-black flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-[10rem] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Oops! Page not found</h2>
            <p className="mt-2 text-gray-700 max-w-md">
                The page you’re looking for doesn’t exist or has been moved. Let’s get you back on track!
            </p>

            <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
            >
                <FaArrowLeft  size={15}/>
                Go back home
            </Link>
        </div>
    );
}

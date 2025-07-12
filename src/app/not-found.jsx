// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg text-center mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-300">
        Go to Home
      </Link>
      <div className="mt-10">

        {/* You can add a creative image here */}
		
        {/* <img src="/images/creative-404.png" alt="Creative 404" className="w-64 h-64 object-contain" /> */}
        
      </div>
    </div>
  );
}

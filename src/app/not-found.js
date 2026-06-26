import Link from 'next/link';

export default function GlobalNotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <h2 className="text-6xl font-black text-slate-300">404</h2>
            <h3 className="text-2xl font-bold text-brand-primary mt-4">Page Not Found</h3>
            <p className="text-slate-500 mt-2 max-w-md">
                The resource or page you are tracking does not exist or has been shifted.
            </p>
            <Link
                href="/"
                className="mt-6 px-5 py-2.5 bg-brand-primary text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors"
            >
                Back To Home
            </Link>
        </div>
    );
}
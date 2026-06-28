'use client';

export default function GlobalLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] bg-transparent antialiased select-none">
            <div className="flex flex-col items-center max-w-xs w-full px-6">

                {/* Minimalist Brand Icon Accent */}
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/10 animate-pulse duration-1000 mb-6">
                    <span className="text-white font-black text-base tracking-tight">R</span>
                </div>

                {/* Ultra-Thin Modern Progress Container */}
                <div className="w-32 h-[2px] bg-zinc-100 dark:bg-zinc-800/60 rounded-full overflow-hidden relative">
                    {/* High-End Smooth Linear Loading Bar */}
                    <div className="absolute top-0 bottom-0 left-0 bg-blue-600 rounded-full w-1/2 animate-loading-slide"></div>
                </div>

                {/* Elegant Micro-Typography */}
                <p className="mt-4 text-xs font-medium tracking-wide text-zinc-400 dark:text-zinc-500 uppercase">
                    Updating Workspace
                </p>
            </div>
        </div>
    );
}
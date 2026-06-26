export default function GlobalLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-secondary"></div>
            <p className="mt-4 text-sm text-slate-500 font-medium">Loading ReSell Hub...</p>
        </div>
    );
}
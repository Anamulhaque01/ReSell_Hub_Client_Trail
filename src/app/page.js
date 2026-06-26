export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight">
        Welcome to ReSell Hub
      </h1>
      <p className="mt-4 text-lg text-slate-600 max-w-xl">
        The ultimate marketplace to buy and sell pre-owned products cleanly, efficiently, and securely.
      </p>
      <div className="mt-8 flex gap-4">
        <span className="px-4 py-2 bg-brand-secondary text-white rounded-md text-sm font-medium shadow-sm">
          Phase 1 Initialized
        </span>
      </div>
    </div>
  );
}
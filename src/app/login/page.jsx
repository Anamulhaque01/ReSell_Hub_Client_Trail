"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading: authLoading } = useAuth();
  
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handles text updates across input fields smoothly[cite: 6]
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Quick autofill utility from page_2.jsx[cite: 6]
  const handleQuickLogin = (roleType) => {
    const profiles = {
      admin: { email: "admin@resellhub.com", password: "adminPassword123" },
      seller: { email: "seller1@resellhub.com", password: "sellerPassword123" },
      buyer: { email: "buyer1@resellhub.com", password: "buyerPassword123" },
    };

    if (profiles[roleType]) {
      setFormData({
        email: profiles[roleType].email,
        password: profiles[roleType].password,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Execute Context login method with the direct state values
      await login(formData.email, formData.password);
      router.push("/");
    } catch (err) {
      setError(err.message || "Invalid email or password configuration.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0c0c0e] flex items-center justify-center p-4 antialiased transition-colors duration-200">
      <div className="w-full max-w-[480px] bg-white dark:bg-[#0e0e10] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-none transition-colors duration-200">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center shadow-md shadow-blue-600/10">
              <span className="text-white font-black text-base tracking-tight">R</span>
            </div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              ReSell<span className="text-[#2563eb]">Hub</span>
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-3 tracking-tight">Welcome back</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20 rounded-xl text-xs text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Quick Demo Login Panel */}
        <div className="bg-[#f4f4f5]/60 dark:bg-[#151518] rounded-xl p-4 mb-6 transition-colors">
          <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block mb-3 tracking-wide">
            Quick Demo Login
          </span>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("admin")}
              className="flex items-center text-left text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40 w-full p-1.5 rounded-lg transition-colors group"
            >
              <span className="bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-200 dark:border-purple-500/20 mr-3 w-12 text-center shrink-0">
                Admin
              </span>
              <span className="font-medium group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">admin@resellhub.com</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("seller")}
              className="flex items-center text-left text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40 w-full p-1.5 rounded-lg transition-colors group"
            >
              <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20 mr-3 w-12 text-center shrink-0">
                Seller
              </span>
              <span className="font-medium group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">seller1@resellhub.com</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("buyer")}
              className="flex items-center text-left text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40 w-full p-1.5 rounded-lg transition-colors group"
            >
              <span className="bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20 mr-3 w-12 text-center shrink-0">
                Buyer
              </span>
              <span className="font-medium group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">buyer1@resellhub.com</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block mb-1">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0-8.25 6.75-8.25-6.75" />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                value={formData.password} // 👈 CRITICAL: This binds it to the state when auto-filling
                onChange={handleInputChange} // 👈 This tracks manual typing
                className="w-full bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 pr-9 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-[#2563eb] hover:bg-blue-700 disabled:bg-blue-600/70 text-white py-2.5 rounded-xl font-medium text-xs transition-colors mt-2 flex items-center justify-center shadow-sm"
          >
            {authLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-5 flex items-center justify-center">
          <div className="border-t border-zinc-200 dark:border-zinc-800 w-full absolute"></div>
          <span className="bg-white dark:bg-[#0e0e10] px-3 text-[10px] text-zinc-400 dark:text-zinc-500 font-medium tracking-wide relative z-10">or</span>
        </div>

        <button
          type="button"
          className="w-full bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 text-zinc-700 dark:text-zinc-200 font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-150"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.258-3.133C18.336 1.938 15.533 1 12.24 1c-6.075 0-11 4.925-11 11s4.925 11 11 11c6.34 0 10.56-4.433 10.56-10.75 0-.725-.078-1.275-.174-1.637H12.24z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="mt-5 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#2563eb] hover:underline font-medium ml-0.5">
              Create one
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
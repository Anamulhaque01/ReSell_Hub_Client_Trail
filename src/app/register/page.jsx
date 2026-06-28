"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser, loading: authLoading } = useAuth();
  
  const [role, setRole] = useState("buyer"); 
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    const userData = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location || "Dhaka",
      role: role,
      password: formData.password,
      photo: "" 
    };

    try {
      await registerUser(userData);
      router.push("/");
    } catch (err) {
      setError(err.message || "Registration pipeline failed");
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
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-3 tracking-tight">Create Account</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Join thousands of buyers and sellers</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20 rounded-xl text-xs text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Intent Options */}
          <div>
            <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block mb-2 tracking-wide">I want to</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("buyer")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                  role === "buyer"
                    ? "border-[#2563eb] bg-[#eff6ff] dark:bg-[#2563eb]/10 ring-1 ring-[#2563eb]"
                    : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <span className="text-lg mb-1">🛍️</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-white">Buyer</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Browse & buy</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("seller")}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                  role === "seller"
                    ? "border-[#2563eb] bg-[#eff6ff] dark:bg-[#2563eb]/10 ring-1 ring-[#2563eb]"
                    : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <span className="text-lg mb-1">💼</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-white">Seller</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">List & sell</span>
              </button>
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 555 0100"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
            />
          </div>

          {/* Location Dropdown */}
          <div>
            <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block mb-1">Location *</label>
            <select
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="w-full bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
            >
              <option value="" disabled className="text-zinc-400">City, State</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Khulna">Khulna</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rajshahi">Rajshahi</option>
            </select>
          </div>

          {/* Passwords Input Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block mb-1">Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Min 6 chars"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 pr-8 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-[27px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <div className="relative">
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block mb-1">Confirm Password *</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 pr-8 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2.5 top-[27px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            {authLoading ? "Creating Account..." : "Create Account"}
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
            Already have an account?{" "}
            <Link href="/login" className="text-[#2563eb] hover:underline font-medium ml-0.5">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
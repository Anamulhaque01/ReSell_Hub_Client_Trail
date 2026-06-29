// src/app/contact/page.jsx
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });
    
    setTimeout(() => {
      setStatus({ loading: false, success: "Message sent successfully!", error: null });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    // FIXED: Added dynamic light mode bg-[#FAF9F6] and text-[#1A1A1A] matching your Featured section
    <main className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] dark:bg-[#0b0b0c] dark:text-gray-100 flex flex-col font-sans transition-colors duration-300 selection:bg-blue-500/30">
      
      {/* Blue Banner Header */}
      <section className="w-full bg-[#2563EB] text-white py-16 px-6 text-center shadow-lg">
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Contact Us
          </h1>
          <p className="text-base md:text-lg text-blue-100 font-medium max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content Split Area */}
      <section className="w-full max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Get in Touch Cards */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A] dark:text-white mb-2 pl-1">
            Get in Touch
          </h2>

          {/* Email Info Card - FIXED: Made background adaptive */}
          <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-[#1d1d22] shadow-sm transition-all duration-200">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-500/20 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide text-gray-500 dark:text-gray-300">Email</h3>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">support@resellhub.com</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Send us an email anytime</p>
            </div>
          </div>

          {/* Phone Info Card - FIXED: Made background adaptive */}
          <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-[#1d1d22] shadow-sm transition-all duration-200">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-500/20 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide text-gray-500 dark:text-gray-300">Phone</h3>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">+1 (555) 123-4567</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Mon-Fri, 9am-6pm EST</p>
            </div>
          </div>

          {/* Address Info Card - FIXED: Made background adaptive */}
          <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-[#1d1d22] shadow-sm transition-all duration-200">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-500/20 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide text-gray-500 dark:text-gray-300">Address</h3>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">123 Market St, San Francisco, CA 94102</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Visit our office</p>
            </div>
          </div>

          {/* Business Hours Card - FIXED: Made background adaptive */}
          <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-[#1d1d22] shadow-sm transition-all duration-200">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-500/20 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide text-gray-500 dark:text-gray-300">Business Hours</h3>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">Mon-Fri: 9am-6pm EST</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Weekend support via email</p>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form Container Panel - FIXED: Adaptive Parent Card */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121214] border border-black/[0.06] dark:border-[#1d1d22] p-8 rounded-2xl shadow-sm transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Split Name and Email Inputs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-bold text-gray-500 dark:text-gray-300 tracking-wide">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold text-gray-500 dark:text-gray-300 tracking-wide">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                />
              </div>
            </div>

            {/* Subject Field Input */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="text-xs font-bold text-gray-500 dark:text-gray-300 tracking-wide">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
              />
            </div>

            {/* Message Area Box Frame */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-bold text-gray-500 dark:text-gray-300 tracking-wide">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell us more..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 resize-none"
              />
            </div>

            {/* Notification Messages Layout Status Window */}
            {status.success && (
              <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-lg">
                {status.success}
              </div>
            )}

            {/* Submit Control Button */}
            <button
              type="submit"
              disabled={status.loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className={`w-4 h-4 transform ${status.loading ? 'animate-spin' : 'rotate-45'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                {status.loading ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                )}
              </svg>
              <span>{status.loading ? "Sending..." : "Send Message"}</span>
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}
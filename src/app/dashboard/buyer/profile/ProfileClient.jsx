'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Camera, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProfileClient() {
  const { token, user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Explicit form state mirroring assignment field variables
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    photo: '',
  });

  const [initials, setInitials] = useState('B');

  useEffect(() => {
    if (!user) return;

    // Populate initial state from auth instance context safely
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      photo: user.photo || '',
    });

    if (user.name) {
      const parts = user.name.split(' ');
      const letters = parts.map((p) => p[0]).join('').toUpperCase();
      setInitials(letters.slice(0, 2));
    }
    setLoading(false);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    setUpdating(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/buyer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          location: formData.location,
          bio: formData.bio,
          photo: formData.photo,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Changes saved successfully!' });
        // Update local state storage configuration mapping matching AuthContext context parameters
        if (typeof window !== 'undefined') {
          const currentStored = localStorage.getItem('resell_user');
          if (currentStored) {
            const parsed = JSON.parse(currentStored);
            const updatedUser = { ...parsed, ...data.user };
            localStorage.setItem('resell_user', JSON.stringify(updatedUser));
          }
        }
      } else {
        throw new Error(data.message || 'Failed to update user profile parameters');
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong.' });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-neutral-400 dark:text-zinc-600" size={28} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Title Header area block */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Profile Settings
        </h1>
      </div>

      {/* Top Profile Emblem Box View following image_5dc547.png */}
      <div className="border border-neutral-200/80 dark:border-zinc-800/90 bg-white dark:bg-[#0c0c0d] p-6 rounded-xl flex items-center gap-4 shadow-sm">
        <div className="relative group cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xl uppercase shadow-inner">
            {formData.photo ? (
              <img src={formData.photo} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white border border-white dark:border-[#0c0c0d]">
            <Camera size={10} />
          </div>
        </div>
        <div className="space-y-0.5">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {formData.name || 'User Account'}
          </h2>
          <p className="text-xs text-neutral-400 dark:text-zinc-500 font-medium">
            {formData.email}
          </p>
          <div className="flex items-center gap-1.5 pt-1 text-[11px] font-medium text-neutral-400 dark:text-zinc-500">
            <span className="capitalize">{user?.role || 'Buyer'}</span>
            <span>•</span>
            <span>Member Since 2026</span>
          </div>
        </div>
      </div>

      {/* Profile Form Block Details Container */}
      <div className="border border-neutral-200/80 dark:border-zinc-800/90 bg-white dark:bg-[#0c0c0d] p-6 rounded-xl shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Personal Information
          </h3>
        </div>

        {message.text && (
          <div className={`p-3.5 rounded-lg flex items-center gap-2.5 text-xs font-semibold ${
            message.type === 'success' 
              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30' 
              : 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-zinc-400">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-neutral-200 dark:border-zinc-800 bg-transparent text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            {/* Email (Disabled Field Wrapper) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-zinc-400">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-neutral-200/50 dark:border-zinc-800/50 bg-neutral-50/50 dark:bg-zinc-900/30 text-neutral-400 dark:text-zinc-500 cursor-not-allowed focus:outline-none"
              />
              <p className="text-[10px] font-medium text-neutral-400 dark:text-zinc-500 px-0.5">
                Email cannot be changed
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-zinc-400">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1-555-0201"
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-neutral-200 dark:border-zinc-800 bg-transparent text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-zinc-400">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="New York, NY"
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-neutral-200 dark:border-zinc-800 bg-transparent text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          {/* Bio text area selection block layout */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700 dark:text-zinc-400">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about yourself..."
              className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-neutral-200 dark:border-zinc-800 bg-transparent text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-blue-600 transition-colors resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={updating}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold tracking-wide transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating && <Loader2 className="animate-spin" size={14} />}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
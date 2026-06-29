'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function ProfileSettings() {
  const { theme } = useTheme();
  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '', location: '', bio: '', createdAt: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('resell_token');
      const res = await fetch('http://localhost:5000/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('resell_token');
    await fetch('http://localhost:5000/api/user/profile', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(profile)
    });
    alert('Profile updated!');
  };

  const isDark = theme === 'dark';
  const containerStyle = isDark ? 'bg-[#09090b] text-white' : 'bg-white text-zinc-900';
  const inputStyle = `w-full p-2 border rounded-md ${isDark ? 'bg-[#0e0e11] border-zinc-800' : 'bg-white border-zinc-200'}`;

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`p-6 max-w-2xl ${containerStyle}`}>
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      {/* User Card */}
      <div className={`p-4 border rounded-lg mb-6 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">
            {profile.fullName?.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold">{profile.fullName}</h2>
            <p className="text-sm text-zinc-500">{profile.email}</p>
            <p className="text-xs text-zinc-400">Member Since {new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-semibold">Full Name</label>
          <input className={inputStyle} value={profile.fullName} onChange={e => setProfile({...profile, fullName: e.target.value})} />
        </div>
        <div>
          <label className="text-sm font-semibold">Email</label>
          <input className={inputStyle} disabled value={profile.email} />
          <p className="text-[10px] text-zinc-500">Email cannot be changed</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-semibold">Phone</label>
          <input className={inputStyle} value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
        </div>
        <div>
          <label className="text-sm font-semibold">Location</label>
          <input className={inputStyle} value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
        </div>
      </div>

      <label className="text-sm font-semibold">Bio</label>
      <textarea className={`${inputStyle} h-24 mb-4`} value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} />

      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold">Save Changes</button>
    </div>
  );
}
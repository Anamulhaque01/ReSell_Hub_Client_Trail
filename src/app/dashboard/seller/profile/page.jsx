'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function ProfileSettings() {
  const { theme } = useTheme();
  const [profile, setProfile] = useState({ 
    fullName: '', 
    email: '', 
    phone: '', 
    location: '', 
    bio: '', 
    createdAt: '' 
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let storedToken = localStorage.getItem('resell_token');
        
        if (!storedToken) {
          setErrorMessage("No token found. Please sign out and log back in.");
          setLoading(false);
          return;
        }

        storedToken = storedToken.replace(/^"|"$/g, '').trim(); 
        const cleanToken = storedToken.startsWith('Bearer ') ? storedToken : `Bearer ${storedToken}`;

        const res = await fetch('http://localhost:5000/api/user/profile', {
          method: 'GET',
          headers: { 
            'Authorization': cleanToken,
            'Content-Type': 'application/json' 
          }
        });
        
        const userData = await res.json();
        console.log("Direct Profile Fetch Log:", userData);

        if (res.ok) {
          // Map MongoDB schema fields directly to state
          setProfile({
            fullName: userData.name || userData.fullName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            location: userData.location || '',
            bio: userData.bio || '',
            createdAt: userData.createdAt || new Date().toISOString()
          });
        } else {
          setErrorMessage(userData.message || "Backend rejected authentication token validation.");
        }
      } catch (err) {
        console.error("Fetch block crash:", err);
        setErrorMessage("Cannot connect to your backend service.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      let storedToken = localStorage.getItem('resell_token');
      storedToken = storedToken.replace(/^"|"$/g, '').trim();
      const cleanToken = storedToken.startsWith('Bearer ') ? storedToken : `Bearer ${storedToken}`;

      // Prepare payload to send back to MongoDB update route
      const payload = {
        name: profile.fullName, // mapping back to database field name
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio
      };

      const res = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': cleanToken 
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) alert('Profile synchronized successfully!');
      else alert('Failed to update profile data.');
    } catch (err) {
      alert('Error updating data.');
    }
  };

  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-[#09090b]' : 'bg-white';
  const border = isDark ? 'border-zinc-800' : 'border-zinc-200';
  const input = `w-full p-2.5 rounded-lg border outline-none ${isDark ? 'bg-[#0e0e11] border-zinc-800' : 'bg-white border-zinc-200'}`;

  if (loading) return <div className="p-12 text-center text-xs text-zinc-500 animate-pulse font-mono">SYNCHRONIZING SECURE KEYCHAINS...</div>;

  if (errorMessage) {
    return (
      <div className={`p-8 min-h-screen ${bg} flex flex-col items-center justify-center space-y-4`}>
        <div className="p-4 rounded-xl border border-red-900/40 bg-red-950/20 text-red-400 text-xs font-mono max-w-md text-center">
          <p className="font-bold uppercase tracking-wider mb-1">Session Handshake Error</p>
          <p>{errorMessage}</p>
        </div>
        <button 
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
          className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-4 py-2 rounded-lg font-bold transition-all"
        >
          Clear Session & Log In Again
        </button>
      </div>
    );
  }

  return (
    <div className={`p-8 min-h-screen ${bg} ${isDark ? 'text-white' : 'text-zinc-900'}`}>
      <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>
      
      <div className={`p-6 border rounded-xl mb-8 flex items-center gap-4 ${border}`}>
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xl shadow text-white">
          {profile.fullName?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="font-bold text-lg">{profile.fullName || 'User Record'}</h2>
          <p className="text-sm text-zinc-500">{profile.email}</p>
          <p className="text-xs text-zinc-400 mt-1">
            Member Since {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>

      <div className="max-w-2xl space-y-6 text-xs font-semibold">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-zinc-400 mb-2 block font-bold uppercase tracking-wider">Full Name</label>
            <input className={input} value={profile.fullName} onChange={e => setProfile({...profile, fullName: e.target.value})} />
          </div>
          <div>
            <label className="text-zinc-400 mb-2 block font-bold uppercase tracking-wider">Email</label>
            <input className={`${input} opacity-50 cursor-not-allowed`} disabled value={profile.email} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-zinc-400 mb-2 block font-bold uppercase tracking-wider">Phone</label>
            <input className={input} value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
          </div>
          <div>
            <label className="text-zinc-400 mb-2 block font-bold uppercase tracking-wider">Location</label>
            <input className={input} value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="text-zinc-400 mb-2 block font-bold uppercase tracking-wider">Bio</label>
          <textarea className={`${input} h-32 resize-none`} value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} />
        </div>

        <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md">
          Save Changes
        </button>
      </div>
    </div>
  );
}
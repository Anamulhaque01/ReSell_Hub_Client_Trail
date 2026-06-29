// src/app/dashboard/admin/users/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../../../context/ThemeContext';

export default function ManageUsersPage() {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token'); 

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
        
        if (!res.ok) {
          throw new Error(`Server status ${res.status}: Check if you are authorized/logged in as Admin.`);
        }
        
        const jsonResponse = await res.json();
        
        if (jsonResponse.success && Array.isArray(jsonResponse.data)) {
          setUsers(jsonResponse.data);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error('Error fetching platform users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleToggleBlock = async (userId, currentStatus) => {
    const nextStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      
      const jsonResponse = await res.json();

      if (res.ok && jsonResponse.success) {
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: nextStatus } : u));
      } else {
        alert(jsonResponse.message || "Failed to update user status.");
      }
    } catch (error) {
      console.error('Failed to change user status in database:', error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const words = name.trim().split(' ');
    if (words.length >= 2) return `${words[0][0]}${words[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarBg = (role) => {
    if (role === 'admin') return 'bg-[#2563EB] text-white';
    if (role === 'seller') return 'bg-[#0EA5E9] text-white';
    return 'bg-[#A855F7] text-white';
  };

  // FIXED: Bulletproof filtering that checks if fields exist before calling toLowerCase()
  const filteredUsers = users.filter(user => {
    const s = searchTerm.toLowerCase();
    const nameMatch = user?.name ? user.name.toLowerCase().includes(s) : false;
    const emailMatch = user?.email ? user.email.toLowerCase().includes(s) : false;
    const locationMatch = user?.location ? user.location.toLowerCase().includes(s) : false;
    
    return nameMatch || emailMatch || locationMatch;
  });

  const isDark = theme === 'dark';
  const textHeading = isDark ? 'text-white' : 'text-[#1A1A1A]';
  const textSub = isDark ? 'text-[#94A3B8]' : 'text-[#64748B]';
  const borderRule = isDark ? 'border-[#1F2124]' : 'border-[#E5E5E5]';

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold tracking-tight transition-colors duration-200 ${textHeading}`}>
          Manage Users ({filteredUsers.length})
        </h1>
      </div>

      {/* Search Input */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full text-sm px-4 py-3 rounded-lg border focus:outline-none transition-all duration-200 ${
            isDark 
              ? 'bg-[#121315] border-[#1F2124] text-white placeholder-[#4B5563] focus:border-[#3B82F6]' 
              : 'bg-white border-[#E5E5E5] text-[#1A1A1A] placeholder-[#94A3B8] focus:border-[#2563EB]'
          }`}
        />
      </div>

      {/* Database User Row List Layout */}
      <div className="space-y-0.5">
        {loading ? (
          <div className="p-8 text-center text-sm font-medium animate-pulse text-[#3B82F6]">
            Loading platform database records...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-sm text-red-500 border border-red-500/20 rounded-lg bg-red-500/5">
            Error: {error}. Make sure you are logged in as admin to access protected collections.
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className={`p-8 text-center text-sm border rounded-lg border-dashed ${textSub} ${borderRule}`}>
            No database accounts found matching the search filter.
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div 
              key={user._id}
              className={`flex items-center justify-between p-4 border-b transition-colors duration-200 ${borderRule} ${
                isDark ? 'hover:bg-[#121315]/50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm tracking-wide shrink-0 ${getAvatarBg(user.role)}`}>
                  {getInitials(user.name)}
                </div>
                <div>
                  <h3 className={`text-sm font-bold tracking-wide transition-colors duration-200 ${textHeading}`}>
                    {user.name}
                  </h3>
                  <p className={`text-xs transition-colors duration-200 ${textSub}`}>
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${
                  user.role === 'admin' 
                    ? 'bg-[#A855F7]/10 text-[#C084FC]' 
                    : user.role === 'seller' 
                      ? 'bg-[#10B981]/10 text-[#34D399]' 
                      : 'bg-[#3B82F6]/10 text-[#60A5FA]'
                }`}>
                  {user.role}
                </span>

                <span className={`text-[11px] font-medium shrink-0 ${
                  user.status === 'blocked' ? 'text-[#EF4444]' : 'text-[#22C55E]'
                }`}>
                  {user.status || 'active'}
                </span>

                <span className={`text-xs hidden sm:inline tracking-wide font-medium min-w-[120px] text-right transition-colors duration-200 ${
                  isDark ? 'text-[#64748B]' : 'text-[#71717A]'
                }`}>
                  {user.location || 'Not Specified'}
                </span>

                {user.role !== 'admin' && (
                  <button
                    type="button"
                    onClick={() => handleToggleBlock(user._id, user.status)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all shrink-0 ${
                      user.status === 'blocked'
                        ? 'bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20'
                        : 'text-[#F59E0B] hover:bg-[#F59E0B]/10'
                    }`}
                  >
                    <span>🔒</span>
                    {user.status === 'blocked' ? 'Unblock' : 'Block'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext';

export default function AdminManageUsersPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Styles
  const pageBg = isDark ? 'bg-[#0B0C0E] text-[#E2E8F0]' : 'bg-[#F8FAFC] text-[#1E293B]';
  const containerBg = isDark ? 'bg-[#121316] border-[#1F2124]' : 'bg-white border-[#E2E8F0]';
  const textHeading = isDark ? 'text-white' : 'text-[#0F172A]';
  const textMuted = isDark ? 'text-[#6C727F]' : 'text-[#64748B]';
  const inputBg = isDark ? 'bg-[#1A1C20] border-[#25282C] text-white' : 'bg-white border-[#CBD5E1] text-[#1E293B]';
  const tableHeaderBg = isDark ? 'bg-[#18191D]' : 'bg-[#F1F5F9]';
  const borderDivider = isDark ? 'border-[#1F2124]' : 'border-[#F1F5F9]';
  const rowHover = isDark ? 'hover:bg-[#18191D]' : 'hover:bg-[#F8FAFC]';

  const getCleanToken = () => {
    // 1. Get the raw value - Added 'resell_token' as the primary key
    const rawToken = localStorage.getItem('resell_token') || 
                     localStorage.getItem('token') || 
                     localStorage.getItem('admin_token') || 
                     localStorage.getItem('userToken') ||
                     localStorage.getItem('adminUser');

    if (!rawToken) return '';

    // 2. If it's a JSON string, parse it to extract the token property
    if (rawToken.startsWith('{')) {
      try {
        const parsed = JSON.parse(rawToken);
        // Common structures for JWT storage
        return parsed.token || parsed.accessToken || parsed.tokenString || '';
      } catch (e) {
        console.error("Failed to parse token object:", e);
        return '';
      }
    }
    
    // 3. Otherwise, return the raw string
    return rawToken;
  };

  const fetchUsersFromDB = async (query = '') => {
    try {
      setLoading(true);
      setError('');
      
      const token = getCleanToken();
      const apiBaseUrl = 'http://localhost:5000';
      
      const res = await fetch(`${apiBaseUrl}/api/admin/users?search=${query}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const result = await res.json();

      if (res.ok) {
        // Direct response array alignment handling
        if (result && Array.isArray(result.data)) {
          setUsers(result.data);
        } else if (Array.isArray(result)) {
          setUsers(result);
        } else if (result && Array.isArray(result.users)) {
          setUsers(result.users);
        }
      } else {
        setError(`Backend Error (${res.status}): ${result.message || 'Failed to populate collections.'}`);
        setUsers([]);
      }
    } catch (err) {
      console.error('Connection failure tracking:', err);
      setError('Could not connect to the database server. Ensure backend process is actively listening.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsersFromDB(search);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleToggleStatus = async (userId, currentStatus) => {
    const targetStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
    try {
      const token = getCleanToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: targetStatus })
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: targetStatus } : u));
      } else {
        alert(`Failed to update status: ${resData.message || 'Update rejected'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Could not update user status due to network error.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Permanently delete this user from MongoDB?')) return;
    try {
      const token = getCleanToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        setUsers(prev => prev.filter(u => u._id !== userId));
      } else {
        alert(`Failed to delete: ${resData.message || 'Deletion rejected'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Could not remove user due to network error.');
    }
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-200 ${pageBg}`}>
      <div className={`border rounded-xl shadow-sm overflow-hidden ${containerBg}`}>
        
        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-xl font-bold tracking-tight ${textHeading}`}>Manage Users</h1>
            <p className={`text-xs mt-1 ${textMuted}`}>Live database data sourced directly from MongoDB cluster collections.</p>
          </div>

          <div className="w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${inputBg}`}
            />
          </div>
        </div>

        {error && (
          <div className="mx-6 mb-4 p-4 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex flex-col gap-2">
            <span className="font-semibold">⚠️ {error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-56">
            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm border-collapse">
              <thead className={`${tableHeaderBg} text-gray-400 border-b ${borderDivider}`}>
                <tr>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">User Name</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Email Address</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-transparent">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className={`px-6 py-14 text-center ${textMuted}`}>
                      No user documents found matching criteria.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className={`transition-colors border-b ${borderDivider} ${rowHover}`}>
                      <td className={`px-6 py-4 font-medium tracking-tight ${textHeading}`}>{user.name}</td>
                      <td className={`px-6 py-4 ${isDark ? 'text-[#A0AEC0]' : 'text-[#4A5568]'}`}>{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                          user.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                          user.role === 'seller' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                          'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {user.role || 'buyer'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                          user.status === 'blocked' 
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {user.status || 'active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                          {user.role === 'admin' ? (
                            // What to show if the user IS an admin
                            <span className={`px-3 py-1.5 rounded text-xs font-semibold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              Restricted
                            </span>
                          ) : (
                            // What to show if the user is NOT an admin (Your original buttons)
                            <>
                              <button
                                onClick={() => handleToggleStatus(user._id, user.status || 'active')}
                                className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-all ${
                                  user.status === 'blocked'
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                                    : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
                                }`}
                              >
                                {user.status === 'blocked' ? 'Unblock' : 'Block'}
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold tracking-wide transition-all shadow-sm"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
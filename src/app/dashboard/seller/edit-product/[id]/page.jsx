'use client';
import { useEffect, useState } from 'react'; // <-- Remove 'use' import
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function EditProductPage({ params }) { // <-- Destructure params directly here
  const router = useRouter();
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    price: '',
    description: '',
    images: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // The rest of your useEffect and form logic remains exactly the same...

  // 1. Fetch current product details to pre-populate inputs on mount
// 1. Fetch current product details to pre-populate inputs on mount
  useEffect(() => {
    const fetchCurrentProduct = async () => {
      try {
        const token = localStorage.getItem('resell_token');
        
        // Switched to the authenticated seller route with Authorization headers
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seller/products/${params.id}`, {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        const data = await res.json();
        
        if (res.ok) {
          setFormData({
            title: data.title || '',
            category: data.category || '',
            condition: data.condition || '',
            price: data.price || '',
            description: data.description || '',
            images: data.images || []
          });
        } else {
          setError(data.message || 'Failed to fetch entry snapshot.');
        }
      } catch (err) {
        setError('Network interface connection timeout.');
      } finally {
        setLoading(false);
      }
    };
    
    if (params?.id) fetchCurrentProduct();
  }, [params.id]);

  // 2. Submit modifications back into MongoDB cluster
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('resell_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seller/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price) // Sanitize numerical value parsing safely
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Listing updated perfectly!');
        router.push('/dashboard/seller/my-products'); // Back to inventory catalog view index
      } else {
        setError(data.message || 'Failed to sync modifications.');
      }
    } catch (err) {
      setError('Communication layer drop during upload lifecycle.');
    } finally {
      setSaving(false);
    }
  };

  const isDark = theme === 'dark';
  const bgFrame = isDark ? 'bg-[#09090b] text-white' : 'bg-zinc-50 text-zinc-900';
  const cardBg = isDark ? 'bg-[#0e0e11] border-zinc-800' : 'bg-white border-zinc-200/80 shadow-sm';
  const inputBg = isDark ? 'bg-[#09090b] border-zinc-800 text-white focus:border-zinc-700' : 'bg-white border-zinc-200 text-zinc-900 focus:border-zinc-300';
  const subText = isDark ? 'text-zinc-500' : 'text-zinc-400';

  if (loading) return <div className="p-12 text-center text-xs font-semibold text-zinc-500 animate-pulse">DOWNLOADING DATA SCHEMATICS...</div>;

  return (
    <div className={`space-y-6 py-4 min-h-screen transition-colors max-w-3xl ${bgFrame}`}>
      <div>
        <h1 className="text-xl font-bold tracking-tight">Edit Product Listing</h1>
        <p className={`text-xs mt-0.5 ${subText}`}>Modify fields and sync parameters cleanly into your live index.</p>
      </div>

      {error && <div className="p-3 text-xs bg-red-950/40 border border-red-900 text-red-400 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className={`border rounded-xl p-6 space-y-4 text-xs font-medium ${cardBg}`}>
        <div>
          <label className="block text-zinc-400 mb-1.5 font-bold">Product Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full p-2.5 rounded-lg border outline-none font-medium ${inputBg}`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-zinc-400 mb-1.5 font-bold">Category</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full p-2.5 rounded-lg border outline-none font-medium ${inputBg}`}
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-1.5 font-bold">Condition</label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className={`w-full p-2.5 rounded-lg border outline-none font-medium cursor-pointer ${inputBg}`}
            >
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1.5 font-bold">Price ($)</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className={`w-full p-2.5 rounded-lg border outline-none font-medium ${inputBg}`}
            />
          </div>
        </div>

        <div>
          <label className="block text-zinc-400 mb-1.5 font-bold">Detailed Description</label>
          <textarea
            rows="4"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`w-full p-2.5 rounded-lg border outline-none font-medium resize-none ${inputBg}`}
          />
        </div>

        <div className="flex items-center gap-2 pt-2 justify-end">
          <button
            type="button"
            onClick={() => router.push('/dashboard/seller/my-products')}
            className="px-4 py-2 text-zinc-500 hover:text-zinc-400 font-bold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold px-5 py-2 rounded-lg transition-all shadow"
          >
            {saving ? 'Saving changes...' : 'Save Updates'}
          </button>
        </div>
      </form>
    </div>
  );
}
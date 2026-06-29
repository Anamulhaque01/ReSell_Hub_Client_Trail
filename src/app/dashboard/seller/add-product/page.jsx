'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function AddProductPage() {
  const router = useRouter();
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    condition: 'Excellent',
    price: '',
    imageUrl: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Client-side quick field validation check
    if (!formData.title || !formData.price || !formData.description) {
      setMessage({ type: 'error', text: 'Please fill in all mandatory parameters.' });
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('resell_token');
      
      // Fallback placeholder image if no URL is provided by the user
      const finalImageUrl = formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500';

      // Pack the exact fields expected by your backend sellerRoutes syntax
      const productPayload = {
        title: formData.title.trim(),
        category: formData.category,
        condition: formData.condition,
        price: Number(formData.price),
        images: [finalImageUrl], // Wrapped in an array to match 'images' validation rule
        description: formData.description.trim()
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seller/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productPayload)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Product listed in MongoDB successfully!' });
        
        // Dynamic cleanup after success
        setFormData({
          title: '',
          category: 'Electronics',
          condition: 'Excellent',
          price: '',
          imageUrl: '',
          description: ''
        });

        setTimeout(() => {
          router.push('/dashboard/seller');
        }, 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Database target transmission tracking failure.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network connection exception while syncing with API server.' });
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === 'dark';
  const cardBg = isDark ? 'bg-[#0e0e11] border-zinc-800/80' : 'bg-white border-zinc-200/80 shadow-sm';
  const inputBg = isDark ? 'bg-[#09090b] border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900';
  const labelText = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const headerText = isDark ? 'text-white' : 'text-zinc-900';
  const descText = isDark ? 'text-zinc-500' : 'text-zinc-400';

  return (
    <div className="max-w-xl mx-auto space-y-6 py-2 transition-colors duration-200">
      <div>
        <h1 className={`text-2xl font-bold tracking-tight ${headerText}`}>Add New Product</h1>
        <p className={`text-xs mt-1 ${descText}`}>Create a new item listing configuration on the marketplace database directory.</p>
      </div>

      {message.text && (
        <div className={`p-3 text-xs rounded border font-medium transition-all ${
          message.type === 'success'
            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50'
            : 'bg-red-950/40 text-red-400 border-red-900/50'
        }`}>
          {message.text}
        </div>
      )}

      <div className={`border rounded-xl p-6 transition-colors duration-200 ${cardBg}`}>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium tracking-wide">
          
          <div>
            <label className={`block mb-1.5 font-semibold ${labelText}`}>Product Name</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., iPhone 13 Pro Max"
              value={formData.title}
              onChange={handleChange}
              className={`w-full rounded px-3 py-2.5 outline-none border transition-all focus:border-blue-500 text-xs ${inputBg}`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block mb-1.5 font-semibold ${labelText}`}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full rounded px-3 py-2.5 outline-none border transition-all focus:border-blue-500 text-xs ${inputBg}`}
              >
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Fashion">Fashion</option>
                <option value="Books">Books</option>
              </select>
            </div>

            <div>
              <label className={`block mb-1.5 font-semibold ${labelText}`}>Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className={`w-full rounded px-3 py-2.5 outline-none border transition-all focus:border-blue-500 text-xs ${inputBg}`}
              >
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block mb-1.5 font-semibold ${labelText}`}>Price ($)</label>
              <input
                type="number"
                name="price"
                required
                min="1"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                className={`w-full rounded px-3 py-2.5 outline-none border transition-all focus:border-blue-500 text-xs ${inputBg}`}
              />
            </div>

            <div>
              <label className={`block mb-1.5 font-semibold ${labelText}`}>Image URL</label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
                className={`w-full rounded px-3 py-2.5 outline-none border transition-all focus:border-blue-500 text-xs ${inputBg}`}
              />
            </div>
          </div>

          <div>
            <label className={`block mb-1.5 font-semibold ${labelText}`}>Description</label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Provide a precise overview regarding usage conditions, hardware issues, or age metrics..."
              value={formData.description}
              onChange={handleChange}
              className={`w-full rounded px-3 py-2.5 outline-none border transition-all focus:border-blue-500 text-xs resize-none ${inputBg}`}
            />
          </div>

          <div className={`border border-dashed rounded-lg p-5 text-center flex flex-col items-center justify-center ${
            isDark ? 'border-zinc-800 bg-zinc-900/10' : 'border-zinc-200 bg-zinc-50/50'
          }`}>
            <span className="text-xl mb-1 select-none">📸</span>
            <p className={`text-[11px] font-semibold ${headerText}`}>Visual Preview Frame Area</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">URLs pass straight inside database records cleanly.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold py-2.5 rounded transition-all text-center mt-2 text-xs"
          >
            {loading ? 'Publishing straight into Database cluster...' : 'Publish Product Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
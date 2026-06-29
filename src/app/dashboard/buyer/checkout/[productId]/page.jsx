// src/app/dashboard/buyer/checkout/[productId]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';

// Hardcoded official Stripe demo public key to guarantee no environmental integration errors
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': {
        color: '#71717a', // Zinc-500
      },
    },
    invalid: {
      color: '#ef4444',
    },
  },
};

function CheckoutForm({ product }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: 'Chris Wang',
    phone: '+1-555-0201',
    email: 'buyer1@resellhub.com',
    address: 'New York, NY'
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'paypal'
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setError("Stripe engine has not loaded fully.");
      return;
    }

    setLoading(true);
    setError(null);

    // If PayPal is chosen for mock simulation
    if (paymentMethod === 'paypal') {
      setTimeout(() => {
        router.push(`/dashboard/buyer/success?id=PAYID-${Math.random().toString(36).substring(2, 9).toUpperCase()}&amt=${product.price}&title=${encodeURIComponent(product.title)}`);
      }, 1500);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Form initialization element allocation fault.");
      setLoading(false);
      return;
    }

    try {
      // 1. Create Payment Intent
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/payments/create-payment-intent`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ price: product.price }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Payment intent initialization error.');

      const clientSecret = data.clientSecret;

      // 2. Confirm processing request with Stripe Gateway
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: deliveryInfo.fullName,
            email: deliveryInfo.email,
            phone: deliveryInfo.phone,
            address: { line1: deliveryInfo.address }
          },
        },
      });

      if (confirmError) {
        setError(confirmError.message);
        setLoading(false);
      } else if (paymentIntent.status === 'succeeded') {
        // 3. Sync transaction ledger metadata back locally to database routes
        const saveRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/payments/store-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            transactionId: paymentIntent.id,
            productId: product._id,
            amount: product.price,
            paymentMethod: 'card',
            deliveryAddress: deliveryInfo.address
          })
        });

        if (saveRes.ok) {
          router.push(`/dashboard/buyer/success?id=${paymentIntent.id}&amt=${product.price}&title=${encodeURIComponent(product.title)}`);
        } else {
          setError("Charged successfully, but database tracking synchronizer reported a save error.");
          setLoading(false);
        }
      }
    } catch (err) {
      setError(err.message || "An unexpected system routing error occurred.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column: Delivery Information Inputs */}
      <div className="lg:col-span-7 bg-[#111113] border border-zinc-800/60 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-semibold text-white">Delivery Information</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={deliveryInfo.fullName}
              onChange={handleInputChange}
              className="w-full bg-[#161619] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-700 transition" 
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400">Phone</label>
            <input 
              type="text" 
              name="phone"
              value={deliveryInfo.phone}
              onChange={handleInputChange}
              className="w-full bg-[#161619] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-700 transition" 
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={deliveryInfo.email}
            onChange={handleInputChange}
            className="w-full bg-[#161619] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-400 focus:outline-none focus:border-zinc-700 transition" 
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">Delivery Address</label>
          <input 
            type="text" 
            name="address"
            value={deliveryInfo.address}
            onChange={handleInputChange}
            className="w-full bg-[#161619] border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-700 transition" 
            required
          />
        </div>
      </div>

      {/* Right Column: Exact Layout for Payment Selection & Order Summary */}
      <div className="lg:col-span-5 bg-[#111113] border border-zinc-800/80 rounded-2xl p-6 space-y-6">
        
        {/* Payment Selection Layout */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase font-mono">Payment Method</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`py-3 px-4 rounded-xl font-medium text-sm border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                paymentMethod === 'card' 
                  ? 'border-blue-500 bg-blue-500/5 text-blue-400' 
                  : 'border-zinc-800 bg-[#161619] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              💳 Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`py-3 px-4 rounded-xl font-medium text-sm border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                paymentMethod === 'paypal' 
                  ? 'border-blue-500 bg-blue-500/5 text-blue-400' 
                  : 'border-zinc-800 bg-[#161619] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              🔹 PayPal
            </button>
          </div>
        </div>

        {/* Dynamic Payment Details Input Wrapper Frame */}
        {paymentMethod === 'card' ? (
          <div className="space-y-2 animated fadeIn">
            <label className="text-xs text-zinc-400 font-medium">Card Details</label>
            <div className="w-full bg-[#161619] border border-zinc-800 rounded-xl px-3.5 py-3.5 transition focus-within:border-zinc-700">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
        ) : (
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs text-zinc-400 font-mono text-center">
            PayPal processing will open standard popups on validation submit.
          </div>
        )}

        <hr className="border-zinc-800/60" />

        {/* Product Meta details metadata layout lines */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold tracking-wide text-zinc-400 uppercase font-mono">Order Summary</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center flex-shrink-0">
              <img 
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=150&q=80'} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold text-white line-clamp-1">{product.title}</h3>
              <span className="inline-block text-[10px] tracking-wide font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50 uppercase">
                {product.condition || 'Used'}
              </span>
            </div>
          </div>
        </div>

        {/* Total Cost Matrix Pricing Breakdown details blocks */}
        <div className="space-y-3 text-xs text-zinc-400 font-mono pt-4 border-t border-zinc-800/60">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-white">৳{Number(product.price).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-emerald-400 font-medium">Free</span>
          </div>
          
          <div className="flex justify-between items-baseline pt-4 border-t border-zinc-800/60 text-sm font-sans">
            <span className="text-white font-semibold">Total</span>
            <span className="text-xl font-bold text-blue-500 font-mono">
              ৳{Number(product.price).toLocaleString()}
            </span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 font-mono">
            {error}
          </div>
        )}

        {/* Interactive primary active state transaction trigger submission button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/10 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
          >
            {loading ? 'Processing...' : `Confirm Purchase (৳${Number(product.price).toLocaleString()})`}
          </button>
        </div>
      </div>

    </form>
  );
}

export default function CheckoutPage() {
  const { productId } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  
  useEffect(() => {
    if (!productId) return;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${baseUrl}/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProduct(data.product);
        else setProduct(data);
        setPageLoading(false);
      })
      .catch(err => {
        console.error(err);
        setPageLoading(false);
      });
  }, [productId]);

  if (pageLoading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-[#0b0b0c]">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center p-4 bg-[#0b0b0c] font-mono text-xs text-zinc-500">
        Product information fetching mismatch.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-zinc-100 py-12 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition group cursor-pointer"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to item view
        </button>

        <Elements stripe={stripePromise}>
          <CheckoutForm product={product} />
        </Elements>

      </div>
    </main>
  );
}
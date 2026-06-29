// app/dashboard/buyer/success/page.jsx
'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const txId = searchParams.get('id');
  const amount = searchParams.get('amt');
  const title = searchParams.get('title');

  return (
    <div className="max-w-md mx-auto my-16 p-8 border border-zinc-200 rounded text-center bg-white space-y-6">
      <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-900 text-xl font-bold">✓</div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Payment Successful</h1>
        <p className="text-sm text-zinc-500">Thank you! Your order collection has been processed.</p>
      </div>
      
      <div className="border-t border-b border-zinc-100 py-4 text-left text-sm space-y-2 text-zinc-600">
        <p><span className="font-medium text-zinc-900">Item:</span> {title}</p>
        <p><span className="font-medium text-zinc-900">Paid Amount:</span> ৳{amount}</p>
        <p className="text-xs break-all"><span className="font-medium text-zinc-900">Transaction ID:</span> <span className="font-mono bg-zinc-50 p-1 rounded text-zinc-700">{txId}</span></p>
        <p><span className="font-medium text-zinc-900">Date:</span> {new Date().toLocaleDateString()}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Link href="/dashboard/buyer/orders" className="py-2.5 bg-black text-white text-sm font-medium hover:bg-zinc-800 transition">
          Go to My Orders
        </Link>
        <Link href="/products" className="py-2.5 border border-zinc-200 text-zinc-700 text-sm font-medium hover:bg-zinc-50 transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
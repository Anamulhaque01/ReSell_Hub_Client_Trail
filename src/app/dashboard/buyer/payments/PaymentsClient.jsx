'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, Loader2 } from 'lucide-react';

export default function PaymentsClient() {
  const { token } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Summary Metrics State Setup
  const [summary, setSummary] = useState({
    totalSpent: 0,
    transactionCount: 0,
    refunded: 0,
    refundCount: 0,
    pending: 0,
    pendingCount: 0,
  });

  useEffect(() => {
    if (!token) return;

    const fetchPayments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/buyer/payments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        
        if (res.ok && Array.isArray(data)) {
          setPayments(data);
          
          // Compute summary variables based on actual status parameters
          let spent = 0, spentCount = 0;
          let ref = 0, refCount = 0;
          let pend = 0, pendCount = 0;

          data.forEach(p => {
            const amount = Number(p.amount) || 0;
            if (p.paymentStatus === 'success' || p.paymentStatus === 'paid') {
              spent += amount;
              spentCount++;
            } else if (p.paymentStatus === 'refunded') {
              ref += amount;
              refCount++;
            } else if (p.paymentStatus === 'pending') {
              pend += amount;
              pendCount++;
            }
          });

          setSummary({
            totalSpent: spent,
            transactionCount: spentCount,
            refunded: ref,
            refundCount: refCount,
            pending: pend,
            pendingCount: pendCount,
          });
        }
      } catch (err) {
        console.error('Error fetching dynamic payment items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-neutral-400 dark:text-zinc-600" size={28} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title Header area block */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Payment History
        </h1>
      </div>

      {/* Summary Matrix Grid following image_5dc105.png design language */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Spent */}
        <div className="border border-neutral-200/80 dark:border-zinc-800/90 bg-white dark:bg-[#0c0c0d] p-5 rounded-xl space-y-1">
          <p className="text-[11px] font-medium text-neutral-500 dark:text-zinc-400">Total Spent</p>
          <p className="text-2xl font-black text-blue-600 dark:text-blue-500">${summary.totalSpent.toLocaleString()}</p>
          <p className="text-[10px] font-medium text-neutral-400 dark:text-zinc-500">{summary.transactionCount} transactions</p>
        </div>

        {/* Refunded */}
        <div className="border border-neutral-200/80 dark:border-zinc-800/90 bg-white dark:bg-[#0c0c0d] p-5 rounded-xl space-y-1">
          <p className="text-[11px] font-medium text-neutral-500 dark:text-zinc-400">Refunded</p>
          <p className="text-2xl font-black text-orange-600 dark:text-orange-500">${summary.refunded.toLocaleString()}</p>
          <p className="text-[10px] font-medium text-neutral-400 dark:text-zinc-500">{summary.refundCount} refunds</p>
        </div>

        {/* Pending */}
        <div className="border border-neutral-200/80 dark:border-zinc-800/90 bg-white dark:bg-[#0c0c0d] p-5 rounded-xl space-y-1">
          <p className="text-[11px] font-medium text-neutral-500 dark:text-zinc-400">Pending</p>
          <p className="text-2xl font-black text-amber-500 dark:text-amber-400">${summary.pending.toLocaleString()}</p>
          <p className="text-[10px] font-medium text-neutral-400 dark:text-zinc-500">{summary.pendingCount} pending</p>
        </div>
      </div>

      {/* Transactions Container List Layout */}
      <div className="border border-neutral-200/80 dark:border-zinc-800/90 bg-white dark:bg-[#0c0c0d] rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-100 dark:border-zinc-800/80">
          <h2 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
            Transactions
          </h2>
        </div>

        {payments.length === 0 ? (
          <div className="p-8 text-center text-xs font-semibold text-neutral-400 dark:text-zinc-500">
            No transaction records found on file.
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 dark:divide-zinc-800/80">
            {payments.map((tx) => (
              <div 
                key={tx._id} 
                className="p-4 flex items-center justify-between hover:bg-neutral-50/40 dark:hover:bg-zinc-900/10 transition-colors"
              >
                {/* Left Block info structure */}
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100/50 dark:border-blue-900/20">
                    <CreditCard size={15} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 tracking-tight font-mono">
                      {tx.transactionId || `TXN-${tx._id?.slice(-8).toUpperCase()}`}
                    </p>
                    <p className="text-[10px] font-medium text-neutral-400 dark:text-zinc-500">
                      {tx.paymentMethod || 'Credit Card'} • {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : 'Recent'}
                    </p>
                  </div>
                </div>

                {/* Right Block pricing alignment */}
                <div className="text-right space-y-0.5">
                  <p className="text-xs font-extrabold text-neutral-900 dark:text-neutral-50">
                    ${Number(tx.amount || tx.orderId?.price || 0).toLocaleString()}
                  </p>
                  <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    tx.paymentStatus === 'success' || tx.paymentStatus === 'paid'
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                      : tx.paymentStatus === 'refunded'
                      ? 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400'
                      : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    {tx.paymentStatus === 'success' ? 'Paid' : tx.paymentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
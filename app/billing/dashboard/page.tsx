"use client";

import { useState, useEffect } from "react";
import { CreditCard, Download, AlertCircle } from "lucide-react";

interface License {
  id: string;
  plan_name: string;
  status: string;
  current_period_end: string;
  created_at: string;
}

interface Invoice {
  id: string;
  amount: number;
  status: string;
  date: string;
}

export default function BillingDashboard() {
  const [license, setLicense] = useState<License | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBillingInfo();
  }, []);

  const fetchBillingInfo = async () => {
    try {
      const res = await fetch("/api/billing/info");
      if (!res.ok) throw new Error("Failed to load billing info");
      const data = await res.json();
      setLicense(data.license);
      setInvoices(data.invoices || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load billing");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/60">Loading billing information...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
          <p className="text-white/60 mt-2">Manage your account and invoices</p>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded text-red-200">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Current Plan */}
        {license ? (
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <CreditCard className="w-6 h-6" />
                  Current Plan
                </h2>
                <p className="text-white/60">
                  {license.status === "active"
                    ? "Your subscription is active"
                    : `Your subscription is ${license.status}`}
                </p>
              </div>
              <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-sm font-semibold text-cyan-300 capitalize">
                {license.plan_name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-white/60 text-sm">Renewal Date</p>
                <p className="text-white font-semibold">
                  {new Date(license.current_period_end).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Started</p>
                <p className="text-white font-semibold">
                  {new Date(license.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="px-6 py-2 border border-white/20 text-white rounded hover:bg-white/5 transition">
                Change Plan
              </button>
              <button className="px-6 py-2 border border-red-500/30 text-red-400 rounded hover:bg-red-500/10 transition">
                Cancel Subscription
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
            <p className="text-white/60 mb-6">No active subscription</p>
            <a
              href="/billing"
              className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded hover:shadow-[0_0_20px_rgba(0,150,255,0.5)] transition"
            >
              Choose a Plan
            </a>
          </div>
        )}

        {/* Invoices */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-8">
          <h2 className="text-xl font-bold text-white mb-6">Invoices</h2>

          {invoices.length === 0 ? (
            <p className="text-white/60 text-center py-8">No invoices yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-white/60 font-medium text-sm">
                      Invoice ID
                    </th>
                    <th className="px-4 py-3 text-left text-white/60 font-medium text-sm">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-white/60 font-medium text-sm">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-white/60 font-medium text-sm">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-white/60 font-medium text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-4 py-3 text-white text-sm font-mono">
                        {invoice.id}
                      </td>
                      <td className="px-4 py-3 text-white text-sm">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-white text-sm font-semibold">
                        ${(invoice.amount / 100).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            invoice.status === "paid"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 text-white rounded text-sm hover:bg-white/5 transition">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Award, QrCode, CreditCard, Heart, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DonationPage: React.FC = () => {
  const { donationsList, addDonation } = useApp();

  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState<number>(5000);
  const [paymentMethod, setPaymentMethod] = useState<'Raast' | 'Bank Transfer' | 'EasyPaisa' | 'JazzCash'>('Bank Transfer');
  const [transactionId, setTransactionId] = useState('');
  const [campaign, setCampaign] = useState('Shigar Education & Healthcare Fund');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const totalDonated = donationsList.reduce((acc, d) => acc + d.amount, 0);
  const goalAmount = 5000000; // PKR 5 Million
  const progressPercent = Math.min(Math.round((totalDonated / goalAmount) * 100), 100);

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0 && (donorName || isAnonymous)) {
      addDonation({
        donorName: isAnonymous ? 'Anonymous Supporter' : donorName,
        amount,
        paymentMethod,
        transactionId: transactionId || `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        campaign,
        isAnonymous
      });

      setDonorName('');
      setTransactionId('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 transition-colors">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#006633] via-emerald-800 to-emerald-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-3 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 px-3.5 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest mx-auto">
          <Heart className="w-3.5 h-3.5 text-emerald-300" />
          <span>Community Development Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Donate & Support Shigar</h1>
        <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto">
          100% of donations are transparently allocated to Shigar youth scholarships, free medical camps, and solar water filtration projects.
        </p>
      </div>

      {/* CAMPAIGN PROGRESS BAR */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Shigar Welfare Campaign Goal</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              PKR {totalDonated.toLocaleString()} <span className="text-xs text-slate-500 font-semibold">raised of PKR {goalAmount.toLocaleString()} target</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-[#006633] dark:text-emerald-400">{progressPercent}%</span>
          </div>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#006633] to-emerald-400 h-full rounded-full transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* DONATION FORM */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 font-extrabold text-base text-emerald-800 dark:text-emerald-400 flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Record Your Donation</span>
          </div>

          <form onSubmit={handleDonationSubmit} className="space-y-5">
            
            {/* Quick Preset Amounts */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Select Donation Amount (PKR)</label>
              <div className="grid grid-cols-4 gap-2">
                {[1000, 5000, 25000, 100000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${
                      amount === amt
                        ? 'bg-[#006633] text-white border-[#006633]'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Rs {amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Or Enter Custom Amount (PKR)</label>
              <input
                type="number"
                required
                min="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Donor Name</label>
              <input
                type="text"
                disabled={isAnonymous}
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="e.g. Muhammad Ibrahim"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
              <label className="inline-flex items-center space-x-2 mt-2 cursor-pointer text-xs text-slate-500">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Keep my donation anonymous</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                >
                  <option value="Bank Transfer">Bank Transfer (HBL / Meezan)</option>
                  <option value="Raast">Raast ID / QR Code</option>
                  <option value="EasyPaisa">EasyPaisa</option>
                  <option value="JazzCash">JazzCash</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Transaction Ref / ID (Optional)</label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g. TXN-8829102"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl font-black text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-xl transition-all uppercase tracking-wider"
            >
              Submit Donation Receipt
            </button>

          </form>
        </div>

        {/* BANK DETAILS & QR CODE */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 border border-slate-800 shadow-lg">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <Building2 className="w-5 h-5" />
              <span>Official Bank Account Details</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <div className="text-slate-400">Bank Name</div>
                <div className="font-bold text-white text-sm">Habib Bank Limited (HBL)</div>
                <div className="text-slate-400 pt-1">Account Title: <span className="text-emerald-300 font-bold">PMLN Shigar Welfare Account</span></div>
                <div className="text-slate-400">Account #: <span className="font-mono text-emerald-400 font-bold">0123-79012345-01</span></div>
                <div className="text-slate-400">IBAN: <span className="font-mono text-slate-200">PK36 HABB 0001 2379 0123 4501</span></div>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                <div className="text-slate-400">Meezan Bank Ltd</div>
                <div className="font-bold text-white text-sm">Meezan Islamic Banking Shigar</div>
                <div className="text-slate-400">Account #: <span className="font-mono text-emerald-400 font-bold">0987-0100234512</span></div>
              </div>
            </div>
          </div>

          {/* QR CODE PLACEHOLDER */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <QrCode className="w-16 h-16 text-[#006633] dark:text-emerald-400 mx-auto" />
            <div className="font-extrabold text-sm text-slate-900 dark:text-white">Raast & Mobile Wallet Instant Transfer</div>
            <p className="text-xs text-slate-500">Scan via EasyPaisa / JazzCash / Bank App</p>
            <div className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 py-2 rounded-lg text-emerald-700 dark:text-emerald-400">
              Raast ID: 03459876543
            </div>
          </div>

        </div>

      </div>

      {/* RECENT DONATION HISTORY */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <h3 className="font-black text-lg text-slate-900 dark:text-white">Recent Donors & Supporters</h3>
        <div className="space-y-2">
          {donationsList.map((don) => (
            <div key={don.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs">
              <div>
                <div className="font-extrabold text-slate-900 dark:text-white">{don.donorName}</div>
                <div className="text-slate-500 text-[10px]">{don.campaign} • {don.date} via {don.paymentMethod}</div>
              </div>
              <div className="font-black text-emerald-700 dark:text-emerald-400 text-sm">
                PKR {don.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

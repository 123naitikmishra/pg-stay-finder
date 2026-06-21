import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { bookingService } from '../../services/bookingService';
import { paymentService } from '../../services/paymentService';

export default function BookingWidget({ property }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Booking states
  const [occupancy, setOccupancy] = useState(property.occupancy[0] || 'Single Sharing');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState(1); // months

  // UI Flow states
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState(null);

  // Fake card states
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');

  // Math calculations
  const rentMultiplier = occupancy === 'Single Sharing' ? 1.0 : occupancy === 'Double Sharing' ? 0.75 : 0.60;
  const monthlyRent = Math.round(property.price * rentMultiplier);
  const securityDeposit = monthlyRent; // Standard 1 month
  const serviceCharge = 499; // Standard cleaning/admin
  const totalAmount = (monthlyRent * duration) + securityDeposit + serviceCharge;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (!startDate) {
      alert("Please select a check-in date.");
      return;
    }
    setCheckoutOpen(true);
  };

  const handleCheckoutProcess = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      // 1. Process payment
      const paymentRes = await paymentService.processPayment(totalAmount, { cardNumber, cardExpiry });
      
      // 2. Write booking to database/local state
      const bookingData = {
        propertyId: property.id,
        propertyName: property.title,
        propertyImage: property.images[0],
        userId: currentUser.id,
        userName: currentUser.name,
        occupancyType: occupancy,
        startDate,
        durationMonths: duration,
        monthlyRent,
        totalAmount,
        paymentStatus: paymentRes.success ? "Paid" : "Failed",
        transactionId: paymentRes.transactionId
      };
      
      const newBooking = await bookingService.createBooking(bookingData);
      setSuccessDetails(newBooking);
      setBookingSuccess(true);
      setCheckoutOpen(false);
    } catch (error) {
      alert("Payment failed. Please check inputs.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sticky top-24">
      {bookingSuccess ? (
        <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg">Booking Requested!</h3>
            <p className="text-xs text-slate-400 mt-1">
              Your booking reference is <span className="font-mono font-bold text-slate-700">{successDetails?.id}</span>
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Monthly Rent:</span>
              <span className="font-bold text-slate-700">₹{successDetails?.monthlyRent.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Paid:</span>
              <span className="font-bold text-emerald-600">₹{successDetails?.totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Check-in:</span>
              <span className="font-bold text-slate-700">{successDetails?.startDate}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/user-dashboard')}
            className="w-full py-3 bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow-md hover:bg-slate-800 transition-colors"
          >
            Go to My Dashboard
          </button>
        </div>
      ) : (
        <form onSubmit={handleBookingSubmit} className="space-y-5">
          {/* Header Pricing */}
          <div className="flex justify-between items-end border-b border-slate-100 pb-4">
            <div>
              <span className="text-2xl font-extrabold text-slate-950">₹{monthlyRent.toLocaleString('en-IN')}</span>
              <span className="text-xs text-slate-400 font-semibold"> /month</span>
            </div>
            <div className="text-[10px] text-emerald-600 font-extrabold flex items-center space-x-1">
              <Sparkles size={10} />
              <span>Includes Wifi & cleaning</span>
            </div>
          </div>

          {/* Occupancy Choice */}
          <div>
            <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              Occupancy Options
            </label>
            <div className="grid grid-cols-3 gap-2">
              {property.occupancy.map((occ) => (
                <button
                  type="button"
                  key={occ}
                  onClick={() => setOccupancy(occ)}
                  className={`py-2 px-1 rounded-xl border text-[10px] font-bold text-center transition-all ${
                    occupancy === occ
                      ? 'bg-primary-50 border-primary-300 text-primary-600 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {occ.replace(' Sharing', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Checkin Date */}
          <div>
            <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              Check-in Date
            </label>
            <div className="relative">
              <Calendar size={14} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
              <input
                type="date"
                required
                value={startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Duration slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                Stay Duration
              </label>
              <span className="text-xs font-extrabold text-slate-700">{duration} {duration === 1 ? 'Month' : 'Months'}</span>
            </div>
            <input 
              type="range"
              min="1"
              max="12"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full accent-primary-500 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Billing breakdown */}
          <div className="bg-slate-50 rounded-2xl p-4 text-xs space-y-2 border border-slate-100/50">
            <div className="flex justify-between">
              <span className="text-slate-400">Rent (₹{monthlyRent} x {duration} mo)</span>
              <span className="font-semibold text-slate-700">₹{(monthlyRent * duration).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Security Deposit (Refundable)</span>
              <span className="font-semibold text-slate-700">₹{securityDeposit.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Onboarding Admin Fee</span>
              <span className="font-semibold text-slate-700">₹{serviceCharge}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between font-extrabold text-sm text-slate-900">
              <span>Total Payable</span>
              <span>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button 
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-rose-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-primary-500/10 hover:shadow-xl hover:from-primary-600 hover:to-rose-700 transition-all text-center"
          >
            {currentUser ? 'Reserve Now' : 'Sign in to Reserve'}
          </button>
        </form>
      )}

      {/* Credit Card Checkout Dialog */}
      {checkoutOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[99] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-200">
            
            {/* Logo Header */}
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard size={24} />
              </div>
              <h3 className="font-extrabold text-slate-800 text-base">Secure Checkout</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Rent reservation via StayFinder Escrow</p>
            </div>

            {/* Price Detail */}
            <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Amount Due</span>
              <span className="text-lg font-extrabold text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>

            {/* Fake Card Details Form */}
            <form onSubmit={handleCheckoutProcess} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Card Number</label>
                <input 
                  type="text" 
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">CVV</label>
                  <input 
                    type="password" 
                    maxLength="3"
                    required
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none text-center"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2 text-[9px] text-slate-400 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                <ShieldAlert size={16} className="text-amber-500 shrink-0" />
                <span>Demo checkout mode enabled. No actual charges will be processed. Keep these credentials.</span>
              </div>

              {/* Submit CTA */}
              <div className="flex space-x-2">
                <button 
                  type="button" 
                  onClick={() => setCheckoutOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 text-center"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold text-center disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Pay rent & book'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

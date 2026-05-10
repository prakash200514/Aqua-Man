import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  CreditCard, MapPin, CheckCircle, Printer,
  Package, Fish, Calendar, ShoppingBag, Home
} from 'lucide-react';
import { inr } from '../utils/currency';

/* ─── helpers ─────────────────────────────────── */
const fmt = (d) =>
  new Date(d).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

const fmtTime = (d) =>
  new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

/* ─── Receipt Modal ───────────────────────────── */
const ReceiptModal = ({ receipt, onClose, onGoHome }) => {
  const receiptRef = useRef();

  const handlePrint = () => {
    const content = receiptRef.current.innerHTML;
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head>
        <title>AquaRiyum – Order Receipt #${receipt.order_id}</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Outfit', sans-serif; background: #f0f9ff; color: #1A3C52; padding: 30px; }
          .receipt { max-width: 680px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,100,180,0.15); }
          .receipt-header { background: linear-gradient(135deg,#0099CC,#00C9A7); color: white; padding: 32px; text-align: center; }
          .receipt-header h1 { font-family:'Syne',sans-serif; font-size:2rem; margin-bottom:6px; }
          .receipt-header p { opacity:0.9; font-size:0.95rem; }
          .badge { background:rgba(255,255,255,0.25); border-radius:30px; padding:6px 18px; display:inline-block; font-size:0.85rem; margin-top:10px; font-weight:700; }
          .body { padding:30px; }
          .row { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #e8f4fc; font-size:0.95rem; }
          .label { color:#5B7D90; }
          .value { font-weight:600; color:#1A3C52; }
          .section-title { font-family:'Syne',sans-serif; font-size:1rem; color:#0099CC; text-transform:uppercase; letter-spacing:1px; margin:22px 0 10px; }
          .item-row { display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #e8f4fc; }
          .item-name { font-weight:600; }
          .item-meta { color:#5B7D90; font-size:0.85rem; }
          .total-box { background:#f0f9ff; border-radius:12px; padding:18px 24px; margin-top:20px; display:flex; justify-content:space-between; align-items:center; }
          .total-label { font-size:1rem; color:#5B7D90; }
          .total-amount { font-family:'Syne',sans-serif; font-size:1.8rem; font-weight:800; color:#FF6B6B; }
          .delivery-box { background:linear-gradient(135deg,#e8f9f5,#d6f0ff); border-radius:12px; padding:20px 24px; margin-top:16px; }
          .delivery-date { font-family:'Syne',sans-serif; font-size:1.2rem; font-weight:800; color:#0099CC; margin-top:4px; }
          .footer { text-align:center; padding:24px; color:#5B7D90; font-size:0.85rem; border-top:1px solid #e8f4fc; }
        </style>
      </head><body>${content}</body></html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  const purchaseDate = new Date(receipt.purchase_date);
  const deliveryDate = new Date(receipt.delivery_date);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,80,120,0.45)',
      backdropFilter: 'blur(8px)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', overflowY: 'auto'
    }}>
      <div style={{
        background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '660px',
        boxShadow: '0 30px 80px rgba(0,100,180,0.25)',
        overflow: 'hidden', position: 'relative',
        animation: 'receiptPop 0.5s cubic-bezier(0.16,1,0.3,1) forwards'
      }}>
        <style>{`@keyframes receiptPop { from { opacity:0; transform:scale(0.88) translateY(30px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>

        {/* ── Printable Content ── */}
        <div ref={receiptRef}>

          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0099CC, #00C9A7)',
            padding: '36px 32px', textAlign: 'center', color: '#fff'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🐠</div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', margin: '0 0 4px' }}>AquaRiyum</h2>
            <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>Order Confirmation & Receipt</p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.22)', borderRadius: '30px',
              padding: '6px 20px', marginTop: '14px',
              fontSize: '0.85rem', fontWeight: '700'
            }}>
              <CheckCircle size={14} /> Order Placed Successfully!
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '28px 32px' }}>

            {/* Order Meta */}
            <p style={{ fontSize: '0.8rem', color: '#5B7D90', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700', marginBottom: '12px' }}>Order Details</p>
            {[
              ['Order ID', `#AQR-${String(receipt.order_id).padStart(5, '0')}`],
              ['Purchase Date', `${fmt(purchaseDate)} at ${fmtTime(purchaseDate)}`],
              ['Customer', receipt.customer_name],
              ['Shipping Address', receipt.shipping_address],
              ['Payment', '•••• •••• •••• ' + receipt.card_last4],
              ['Status', '✅ Confirmed'],
            ].map(([label, val]) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
                gap: '6px', padding: '11px 0',
                borderBottom: '1px solid #e8f4fc', fontSize: '0.93rem'
              }}>
                <span style={{ color: '#5B7D90' }}>{label}</span>
                <span style={{ fontWeight: '600', color: '#1A3C52', textAlign: 'right', maxWidth: '55%' }}>{val}</span>
              </div>
            ))}

            {/* Items */}
            <p style={{ fontSize: '0.8rem', color: '#5B7D90', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700', margin: '22px 0 10px' }}>
              🐟 Items Ordered
            </p>
            {receipt.items.map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 0', borderBottom: '1px solid #e8f4fc'
              }}>
                <div>
                  <div style={{ fontWeight: '700', color: '#1A3C52', fontSize: '0.97rem' }}>{item.fish_name}</div>
                  <div style={{ color: '#5B7D90', fontSize: '0.84rem', marginTop: '2px' }}>Qty: {item.quantity} × {inr(item.price)}</div>
                </div>
                <div style={{ fontWeight: '800', color: '#FF6B6B', fontSize: '1.05rem' }}>
                  {inr(item.quantity * parseFloat(item.price))}
                </div>
              </div>
            ))}

            {/* Totals */}
            <div style={{ marginTop: '16px' }}>
              {[
                ['Subtotal', inr(receipt.total_amount)],
                ['Shipping', 'FREE 🚀'],
                ['Tax (GST)', '₹0.00'],
              ].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: '#5B7D90', fontSize: '0.93rem' }}>
                  <span>{l}</span><span style={{ color: '#1A3C52', fontWeight: '600' }}>{v}</span>
                </div>
              ))}
              <div style={{
                background: 'linear-gradient(135deg, #fff0f0, #fff8f0)',
                borderRadius: '14px', padding: '18px 22px', marginTop: '12px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: '1.5px solid rgba(255,107,107,0.2)'
              }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', color: '#1A3C52', fontWeight: '700' }}>Total Paid</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.9rem', fontWeight: '800', color: '#FF6B6B' }}>
                  {inr(receipt.total_amount)}
                </span>
              </div>
            </div>

            {/* Delivery Date Box */}
            <div style={{
              background: 'linear-gradient(135deg, #e0f7ff, #d6f8f0)',
              borderRadius: '16px', padding: '22px 24px', marginTop: '20px',
              border: '1.5px solid rgba(0,153,204,0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <Calendar size={20} color="#0099CC" />
                <span style={{ fontWeight: '700', color: '#0099CC', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Estimated Delivery Date
                </span>
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: '800', color: '#1A3C52', marginBottom: '6px' }}>
                🚚 {fmt(deliveryDate)}
              </div>
              <div style={{ color: '#5B7D90', fontSize: '0.88rem' }}>
                Your aquatic friends will arrive within 5 business days of your purchase.
              </div>
            </div>

            {/* Footer note */}
            <div style={{ textAlign: 'center', marginTop: '24px', color: '#5B7D90', fontSize: '0.82rem', lineHeight: '1.6' }}>
              Thank you for shopping with <strong>AquaRiyum</strong> 🐠<br />
              For support, contact us at <strong>support@aquariyum.com</strong>
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div style={{
          display: 'flex', gap: '12px', padding: '20px 32px 28px',
          borderTop: '1px solid #e8f4fc', background: '#fafeff'
        }}>
          <button
            onClick={handlePrint}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg,#0099CC,#00BBEE)', color: '#fff',
              fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: '0 4px 14px rgba(0,153,204,0.35)', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
          >
            <Printer size={18} /> Print / Download Receipt
          </button>
          <button
            onClick={onGoHome}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px',
              border: '1.5px solid rgba(0,153,204,0.3)',
              background: 'rgba(0,153,204,0.06)', color: '#0099CC',
              fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,153,204,0.14)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,153,204,0.06)'}
          >
            <Home size={18} /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Checkout Page ──────────────────────── */
const Checkout = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '', address: '', city: '', zipCode: '',
    cardNumber: '', expiry: '', cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const totalAmount = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity), 0
  );

  useEffect(() => {
    if (!user) { toast.error('Please login to checkout'); navigate('/login'); }
    if (cart.length === 0 && !receipt) navigate('/products');
  }, [user, cart, navigate, receipt]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      const res = await axios.post('http://localhost/Aquarium/backend/api/orders.php', {
        user_id: user.id,
        total_amount: totalAmount,
        shipping_address: `${formData.address}, ${formData.city} – ${formData.zipCode}`
      });

      if (res.data.status === 'success') {
        fetchCart();
        setReceipt({
          ...res.data,
          customer_name: formData.fullName,
          card_last4: formData.cardNumber.slice(-4)
        });
        toast.success('🐠 Order placed! Your receipt is ready.');
      } else {
        toast.error('Failed to place order: ' + (res.data.message || ''));
      }
    } catch (err) {
      toast.error('An error occurred during checkout.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>

      {/* Receipt Modal */}
      {receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={() => setReceipt(null)}
          onGoHome={() => navigate('/')}
        />
      )}

      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{
            fontSize: 'clamp(2rem,5vw,3rem)', fontFamily: 'Syne, sans-serif',
            color: '#1A3C52'
          }}>
            Secure <span style={{ color: '#0099CC' }}>Checkout</span>
          </h1>
          <p style={{ color: '#5B7D90', marginTop: '10px' }}>Complete your order in seconds 🔒</p>
        </div>

        <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap', maxWidth: '1100px', margin: '0 auto' }}>

          {/* ── Left: Form ── */}
          <div style={{ flex: '1 1 580px' }}>
            <form onSubmit={handlePlaceOrder} style={{
              background: '#fff', padding: '40px', borderRadius: '24px',
              border: '1.5px solid rgba(0,153,204,0.14)',
              boxShadow: '0 8px 32px rgba(0,153,204,0.1)'
            }}>
              {/* Shipping */}
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1A3C52', fontFamily: 'Syne, sans-serif' }}>
                <MapPin size={20} color="#0099CC" /> Shipping Information
              </h3>
              <input type="text" name="fullName" placeholder="Full Name" className="input-field" required value={formData.fullName} onChange={handleChange} />
              <input type="text" name="address" placeholder="Street Address" className="input-field" required value={formData.address} onChange={handleChange} />
              <div style={{ display: 'flex', gap: '14px' }}>
                <input type="text" name="city" placeholder="City" className="input-field" required value={formData.city} onChange={handleChange} />
                <input type="text" name="zipCode" placeholder="ZIP Code" className="input-field" required value={formData.zipCode} onChange={handleChange} />
              </div>

              {/* Payment */}
              <h3 style={{ marginTop: '24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1A3C52', fontFamily: 'Syne, sans-serif' }}>
                <CreditCard size={20} color="#0099CC" /> Payment Details
              </h3>
              <input type="text" name="cardNumber" placeholder="Card Number (16 digits)" className="input-field" required maxLength="16" value={formData.cardNumber} onChange={handleChange} />
              <div style={{ display: 'flex', gap: '14px' }}>
                <input type="text" name="expiry" placeholder="MM/YY" className="input-field" required maxLength="5" value={formData.expiry} onChange={handleChange} />
                <input type="text" name="cvv" placeholder="CVV" className="input-field" required maxLength="4" value={formData.cvv} onChange={handleChange} />
              </div>

              {/* Delivery note */}
              <div style={{
                background: 'linear-gradient(135deg,#e0f7ff,#d6f8f0)',
                borderRadius: '12px', padding: '14px 18px', marginBottom: '20px',
                display: 'flex', alignItems: 'center', gap: '10px',
                border: '1.5px solid rgba(0,201,167,0.25)'
              }}>
                <Calendar size={18} color="#00C9A7" />
                <div>
                  <span style={{ fontWeight: '700', color: '#00C9A7', fontSize: '0.85rem' }}>Estimated Delivery: </span>
                  <span style={{ color: '#1A3C52', fontSize: '0.85rem', fontWeight: '600' }}>
                    {fmt(new Date(Date.now() + 5 * 86400000))}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  width: '100%', padding: '18px', borderRadius: '14px', border: 'none',
                  background: isProcessing ? 'rgba(0,153,204,0.5)' : 'linear-gradient(135deg,#0099CC,#00BBEE)',
                  color: '#fff', fontSize: '1.1rem', fontWeight: '800',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  boxShadow: '0 6px 22px rgba(0,153,204,0.35)', transition: 'all 0.3s'
                }}
              >
                {isProcessing
                  ? <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span> Processing Payment...</>
                  : <><ShoppingBag size={20} /> Pay ${totalAmount.toFixed(2)} & Get Receipt</>
                }
              </button>
            </form>
          </div>

          {/* ── Right: Order Summary ── */}
          <div style={{ flex: '1 1 320px' }}>
            <div style={{
              background: '#fff', padding: '36px', borderRadius: '24px',
              border: '1.5px solid rgba(0,153,204,0.14)',
              boxShadow: '0 8px 32px rgba(0,153,204,0.1)',
              position: 'sticky', top: '100px'
            }}>
              <h3 style={{ marginBottom: '24px', fontFamily: 'Syne, sans-serif', color: '#1A3C52', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={20} color="#0099CC" /> Order Summary
              </h3>

              <div style={{ maxHeight: '320px', overflowY: 'auto', marginBottom: '24px' }}>
                {cart.map(item => (
                  <div key={item.cart_id} style={{
                    display: 'flex', gap: '14px', marginBottom: '16px',
                    paddingBottom: '16px', borderBottom: '1px solid #e8f4fc'
                  }}>
                    <img
                      src={item.image
                        ? `http://localhost/Aquarium/backend/uploads/fish_images/${item.image}`
                        : 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=80'}
                      alt={item.fish_name}
                      style={{ width: '65px', height: '65px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #e0f3fc' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#1A3C52' }}>{item.fish_name}</div>
                      <div style={{ color: '#5B7D90', fontSize: '0.84rem', marginTop: '3px' }}>Qty: {item.quantity}</div>
                      <div style={{ color: '#FF6B6B', fontWeight: '800', marginTop: '4px' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {[['Subtotal', `$${totalAmount.toFixed(2)}`], ['Shipping', 'FREE'], ['Tax', '$0.00']].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#5B7D90', fontSize: '0.93rem' }}>
                  <span>{l}</span>
                  <span style={{ color: l === 'Shipping' ? '#00C9A7' : '#1A3C52', fontWeight: '600' }}>{v}</span>
                </div>
              ))}

              <div style={{
                display: 'flex', justifyContent: 'space-between',
                paddingTop: '16px', borderTop: '2px solid #e0f3fc',
                fontSize: '1.3rem', fontWeight: '800'
              }}>
                <span style={{ fontFamily: 'Syne, sans-serif', color: '#1A3C52' }}>Total</span>
                <span style={{ color: '#FF6B6B' }}>${totalAmount.toFixed(2)}</span>
              </div>

              <div style={{
                marginTop: '20px', padding: '14px', borderRadius: '12px',
                background: 'rgba(0,153,204,0.06)', border: '1px solid rgba(0,153,204,0.15)',
                display: 'flex', alignItems: 'center', gap: '8px',
                color: '#0099CC', fontSize: '0.85rem', fontWeight: '600', justifyContent: 'center'
              }}>
                <CheckCircle size={16} /> 100% Secure &amp; Encrypted Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;

import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {
  Package, Calendar, MapPin, ChevronDown, ChevronUp,
  Printer, ShoppingBag, Clock, CheckCircle, Truck, Fish
} from 'lucide-react';
import { inr } from '../utils/currency';

/* ── Helpers ─────────────────────────────────────── */
const fmt = (d) =>
  new Date(d).toLocaleDateString('en-IN', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });

const fmtFull = (d) =>
  new Date(d).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

const fmtTime = (d) =>
  new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

const STATUS_CONFIG = {
  pending:   { color: '#FFA500', bg: 'rgba(255,165,0,0.1)',   icon: <Clock size={13} />,        label: 'Pending' },
  confirmed: { color: '#0099CC', bg: 'rgba(0,153,204,0.1)',   icon: <CheckCircle size={13} />,  label: 'Confirmed' },
  shipped:   { color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', icon: <Truck size={13} />,         label: 'Shipped' },
  delivered: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: <CheckCircle size={13} />,  label: 'Delivered' },
  cancelled: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  icon: null,                        label: 'Cancelled' },
};

/* ── Receipt Print helper ────────────────────────── */
const printReceipt = (order) => {
  const items = order.items || [];
  const itemRows = items.map(it => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8f4fc;">${it.fish_name}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e8f4fc;text-align:center;">${it.quantity}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e8f4fc;text-align:right;">&#8377;${parseFloat(it.price).toLocaleString('en-IN',{minimumFractionDigits:2})}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e8f4fc;text-align:right;font-weight:700;color:#FF6B6B;">
        &#8377;${(it.quantity * parseFloat(it.price)).toLocaleString('en-IN',{minimumFractionDigits:2})}
      </td>
    </tr>`).join('');

  const deliveryDate = order.delivery_date
    ? fmtFull(order.delivery_date)
    : fmtFull(new Date(new Date(order.created_at).getTime() + 5 * 86400000));

  const win = window.open('', '_blank');
  win.document.write(`
    <html><head>
      <title>AquaRiyum – Receipt #AQR-${String(order.id).padStart(5,'0')}</title>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
      <style>
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Outfit',sans-serif;background:#f0f9ff;color:#1A3C52;padding:30px;}
        .wrap{max-width:700px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,100,180,.15);}
        .hd{background:linear-gradient(135deg,#0099CC,#00C9A7);color:#fff;padding:36px;text-align:center;}
        .hd h1{font-family:'Syne',sans-serif;font-size:2rem;margin-bottom:4px;}
        .badge{display:inline-block;background:rgba(255,255,255,.22);border-radius:30px;padding:6px 20px;font-size:.85rem;font-weight:700;margin-top:12px;}
        .body{padding:32px;}
        .meta-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #e8f4fc;font-size:.93rem;}
        .meta-label{color:#5B7D90;}.meta-value{font-weight:600;color:#1A3C52;}
        .sec{font-size:.78rem;color:#5B7D90;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin:22px 0 10px;}
        table{width:100%;border-collapse:collapse;}
        th{text-align:left;padding:8px 0;color:#5B7D90;font-size:.82rem;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #e0f3fc;}
        th:last-child,th:nth-child(3),th:nth-child(2){text-align:right;}
        .total-box{background:linear-gradient(135deg,#fff0f0,#fff8f0);border-radius:12px;padding:18px 22px;margin-top:16px;display:flex;justify-content:space-between;align-items:center;}
        .total-label{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;}
        .total-amt{font-family:'Syne',sans-serif;font-size:1.9rem;font-weight:800;color:#FF6B6B;}
        .delivery-box{background:linear-gradient(135deg,#e0f7ff,#d6f8f0);border-radius:14px;padding:20px 24px;margin-top:18px;}
        .del-title{color:#0099CC;font-weight:700;font-size:.85rem;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;}
        .del-date{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:#1A3C52;}
        .footer{text-align:center;padding:22px;color:#5B7D90;font-size:.82rem;border-top:1px solid #e8f4fc;}
      </style>
    </head><body>
    <div class="wrap">
      <div class="hd">
        <div style="font-size:2.2rem;margin-bottom:8px;">🐠</div>
        <h1>AquaRiyum</h1>
        <p style="opacity:.9;font-size:.95rem;">Order Receipt & Confirmation</p>
        <div class="badge">✅ Order #AQR-${String(order.id).padStart(5,'0')}</div>
      </div>
      <div class="body">
        <div class="sec">Order Information</div>
        <div class="meta-row"><span class="meta-label">Order ID</span><span class="meta-value">#AQR-${String(order.id).padStart(5,'0')}</span></div>
        <div class="meta-row"><span class="meta-label">Purchase Date</span><span class="meta-value">${fmt(order.created_at)} at ${fmtTime(order.created_at)}</span></div>
        <div class="meta-row"><span class="meta-label">Shipping Address</span><span class="meta-value">${order.shipping_address || 'N/A'}</span></div>
        <div class="meta-row"><span class="meta-label">Status</span><span class="meta-value" style="text-transform:capitalize;">${order.status}</span></div>

        <div class="sec">🐟 Items Ordered</div>
        <table>
          <thead><tr>
            <th>Fish</th><th style="text-align:center;">Qty</th>
            <th style="text-align:right;">Unit Price</th><th style="text-align:right;">Subtotal</th>
          </tr></thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div class="meta-row" style="margin-top:12px;"><span class="meta-label">Shipping</span><span class="meta-value" style="color:#00C9A7;">FREE 🚀</span></div>
        <div class="total-box">
          <span class="total-label">Total Paid</span>
          <span class="total-amt">&#8377;${parseFloat(order.total_amount).toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
        </div>

        <div class="delivery-box">
          <div class="del-title">🚚 Estimated Delivery Date</div>
          <div class="del-date">${deliveryDate}</div>
          <div style="color:#5B7D90;font-size:.86rem;margin-top:6px;">Delivered within 5 days of purchase.</div>
        </div>
      </div>
      <div class="footer">Thank you for shopping with <strong>AquaRiyum</strong> 🐠 &nbsp;|&nbsp; support@aquariyum.com</div>
    </div>
    </body></html>`);
  win.document.close();
  win.focus();
  win.print();
  win.close();
};

/* ── Single Order Card ────────────────────────── */
const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;

  const deliveryDate = order.delivery_date
    ? order.delivery_date
    : new Date(new Date(order.created_at).getTime() + 5 * 86400000);

  const isDelivered = order.status === 'delivered';

  return (
    <div style={{
      background: '#fff',
      borderRadius: '20px',
      border: '1.5px solid rgba(0,153,204,0.14)',
      boxShadow: '0 4px 20px rgba(0,153,204,0.08)',
      overflow: 'hidden',
      marginBottom: '22px',
      transition: 'box-shadow 0.3s'
    }}>
      {/* ── Card Header ── */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '14px',
          padding: '22px 28px', cursor: 'pointer',
          borderBottom: open ? '1px solid #e8f4fc' : 'none',
          background: open ? 'rgba(0,153,204,0.03)' : '#fff',
          transition: 'background 0.2s'
        }}
      >
        {/* Left: ID + date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px',
            background: 'linear-gradient(135deg,#e0f7ff,#d6f8f0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem', flexShrink: 0
          }}>🐠</div>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '800', color: '#1A3C52', fontSize: '1.05rem' }}>
              Order #AQR-{String(order.id).padStart(5, '0')}
            </div>
            <div style={{ color: '#5B7D90', fontSize: '0.83rem', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={12} /> {fmt(order.created_at)} at {fmtTime(order.created_at)}
            </div>
          </div>
        </div>

        {/* Middle: items count + amount */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#5B7D90', textTransform: 'uppercase', letterSpacing: '1px' }}>Items</div>
            <div style={{ fontWeight: '800', color: '#1A3C52', fontSize: '1.1rem' }}>{(order.items || []).length}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#5B7D90', textTransform: 'uppercase', letterSpacing: '1px' }}>Total</div>
            <div style={{ fontWeight: '800', color: '#FF6B6B', fontSize: '1.1rem' }}>{inr(order.total_amount)}</div>
          </div>
          {/* Status badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: status.bg, color: status.color,
            padding: '6px 14px', borderRadius: '30px',
            fontWeight: '700', fontSize: '0.82rem'
          }}>
            {status.icon} {status.label}
          </div>
        </div>

        {/* Right: chevron */}
        <div style={{ color: '#0099CC' }}>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* ── Expanded Details ── */}
      {open && (
        <div style={{ padding: '24px 28px', animation: 'fadeIn 0.3s ease' }}>
          <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }`}</style>

          {/* Items table */}
          <p style={{ fontSize: '0.78rem', color: '#5B7D90', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700', marginBottom: '14px' }}>
            🐟 Items Ordered
          </p>

          <div style={{ marginBottom: '20px' }}>
            {(order.items || []).map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '12px 0', borderBottom: '1px solid #e8f4fc'
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0, overflow: 'hidden',
                  background: 'linear-gradient(135deg,#C8EEFF,#E8F9FF)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {item.image
                    ? <img src={`http://localhost/Aquarium/backend/uploads/fish_images/${item.image}`} alt={item.fish_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <Fish size={22} color="#0099CC" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', color: '#1A3C52', fontSize: '0.97rem' }}>{item.fish_name}</div>
                  <div style={{ color: '#5B7D90', fontSize: '0.83rem', marginTop: '2px' }}>
                    Qty: {item.quantity} × {inr(item.price)}
                  </div>
                </div>
                <div style={{ fontWeight: '800', color: '#FF6B6B', fontSize: '1.05rem' }}>
                  {inr(item.quantity * parseFloat(item.price))}
                </div>
              </div>
            ))}
          </div>

          {/* Info row */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>

            {/* Shipping Address */}
            {order.shipping_address && (
              <div style={{
                flex: '1 1 220px', background: '#f8fcff',
                borderRadius: '14px', padding: '16px',
                border: '1px solid rgba(0,153,204,0.12)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#0099CC', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  <MapPin size={14} /> Shipping Address
                </div>
                <div style={{ color: '#1A3C52', fontWeight: '600', fontSize: '0.92rem', lineHeight: '1.5' }}>
                  {order.shipping_address}
                </div>
              </div>
            )}

            {/* Delivery Date */}
            <div style={{
              flex: '1 1 220px',
              background: 'linear-gradient(135deg,#e0f7ff,#d6f8f0)',
              borderRadius: '14px', padding: '16px',
              border: '1px solid rgba(0,201,167,0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#00C9A7', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                <Truck size={14} /> {isDelivered ? 'Delivered On' : 'Est. Delivery'}
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '800', color: '#1A3C52', fontSize: '1.05rem' }}>
                🚚 {fmtFull(deliveryDate)}
              </div>
              {!isDelivered && (
                <div style={{ color: '#5B7D90', fontSize: '0.8rem', marginTop: '4px' }}>
                  5 days after purchase
                </div>
              )}
            </div>

            {/* Total */}
            <div style={{
              flex: '1 1 160px',
              background: 'linear-gradient(135deg,#fff0f0,#fff8f0)',
              borderRadius: '14px', padding: '16px',
              border: '1px solid rgba(255,107,107,0.18)'
            }}>
              <div style={{ color: '#FF6B6B', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Total Paid
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: '800', color: '#FF6B6B', fontSize: '1.6rem' }}>
                {inr(order.total_amount)}
              </div>
              <div style={{ color: '#5B7D90', fontSize: '0.78rem', marginTop: '2px' }}>Free Shipping</div>
            </div>
          </div>

          {/* Print Receipt button */}
          <button
            onClick={() => printReceipt(order)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg,#0099CC,#00BBEE)',
              color: '#fff', border: 'none', padding: '11px 24px',
              borderRadius: '12px', fontWeight: '700', fontSize: '0.9rem',
              cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,153,204,0.3)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
          >
            <Printer size={16} /> Print Receipt
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Main Page ───────────────────────────────── */
const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    axios.get(`http://localhost/Aquarium/backend/api/orders.php?user_id=${user.id}`)
      .then(res => {
        if (res.data.status === 'success') setOrders(res.data.orders);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const filtered = filter === 'all'
    ? orders
    : orders.filter(o => o.status === filter);

  const FILTERS = ['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  /* summary stats */
  const totalSpent = orders.reduce((s, o) => s + parseFloat(o.total_amount), 0);
  const totalItems  = orders.reduce((s, o) => s + (o.items || []).length, 0);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '110px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>

        {/* ── Page Title ── */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,153,204,0.08)', border: '1.5px solid rgba(0,153,204,0.2)',
            padding: '6px 20px', borderRadius: '30px',
            color: '#0099CC', fontWeight: '700', fontSize: '0.8rem',
            letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px'
          }}>
            <Package size={14} /> My Orders
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#1A3C52', marginBottom: '10px' }}>
            Order <span style={{ color: '#0099CC' }}>History</span>
          </h1>
          <p style={{ color: '#5B7D90', fontSize: '1rem' }}>
            Track all your aquatic purchases and re-print receipts anytime.
          </p>
        </div>

        {/* ── Stats ── */}
        {orders.length > 0 && (
          <div style={{ display: 'flex', gap: '16px', marginBottom: '36px', flexWrap: 'wrap' }}>
            {[
              { icon: '🛒', label: 'Total Orders', value: orders.length },
              { icon: '🐠', label: 'Fish Ordered', value: totalItems },
              { icon: '💰', label: 'Total Spent',  value: inr(totalSpent) },
            ].map(s => (
              <div key={s.label} style={{
                flex: '1 1 160px', background: '#fff',
                borderRadius: '16px', padding: '20px 22px',
                border: '1.5px solid rgba(0,153,204,0.12)',
                boxShadow: '0 4px 16px rgba(0,153,204,0.08)',
                display: 'flex', alignItems: 'center', gap: '14px'
              }}>
                <div style={{ fontSize: '1.8rem' }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#5B7D90', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: '800', color: '#1A3C52' }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Filters ── */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {FILTERS.map(f => {
            const cfg = f === 'all' ? null : STATUS_CONFIG[f];
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 20px', borderRadius: '30px', border: 'none',
                  fontWeight: '700', fontSize: '0.83rem', cursor: 'pointer',
                  textTransform: 'capitalize', letterSpacing: '0.5px',
                  transition: 'all 0.2s',
                  background: isActive
                    ? (cfg ? cfg.color : '#0099CC')
                    : 'rgba(255,255,255,0.8)',
                  color: isActive ? '#fff' : '#5B7D90',
                  boxShadow: isActive ? '0 4px 14px rgba(0,0,0,0.12)' : 'none',
                  border: isActive ? 'none' : '1.5px solid rgba(0,153,204,0.15)'
                }}
              >
                {f === 'all' ? `All (${orders.length})` : `${f} (${orders.filter(o => o.status === f).length})`}
              </button>
            );
          })}
        </div>

        {/* ── Orders List ── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#5B7D90' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px', animation: 'float 2s ease-in-out infinite' }}>🐠</div>
            <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Loading your orders…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 40px',
            background: '#fff', borderRadius: '24px',
            border: '1.5px solid rgba(0,153,204,0.12)',
            boxShadow: '0 4px 20px rgba(0,153,204,0.08)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🐟</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', color: '#1A3C52', fontSize: '1.5rem', marginBottom: '10px' }}>
              {filter === 'all' ? 'No orders yet!' : `No ${filter} orders`}
            </h3>
            <p style={{ color: '#5B7D90', marginBottom: '28px' }}>
              {filter === 'all'
                ? 'Start exploring our exotic fish collection and place your first order.'
                : `You have no orders with status "${filter}".`}
            </p>
            {filter === 'all' && (
              <button
                onClick={() => navigate('/products')}
                style={{
                  background: 'linear-gradient(135deg,#0099CC,#00BBEE)',
                  color: '#fff', border: 'none', padding: '14px 32px',
                  borderRadius: '50px', fontWeight: '700', fontSize: '1rem',
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px',
                  boxShadow: '0 6px 20px rgba(0,153,204,0.3)'
                }}
              >
                <ShoppingBag size={18} /> Browse Collection
              </button>
            )}
          </div>
        ) : (
          filtered.map(order => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

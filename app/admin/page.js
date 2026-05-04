"use client";

import { useEffect, useState } from "react";
import { getOrders } from "../actions";
import { checkAuth, logoutAdmin } from "../authActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function verifyAuth() {
      const auth = await checkAuth();
      if (!auth) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
        fetchOrders();
      }
    }
    
    async function fetchOrders() {
      const data = await getOrders();
      setOrders(data.reverse()); // Show newest first
      setLoading(false);
    }

    verifyAuth();
    
    // Refresh every 30 seconds if authenticated
    const interval = setInterval(() => {
      if (isAuthenticated) fetchOrders();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [router, isAuthenticated]);

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/" className="text-primary hover:opacity-80 transition-opacity">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              <h1 className="text-3xl font-bold">Order Dashboard</h1>
            </div>
            <p className="text-foreground-muted">Managing incoming sushi orders in Warsaw</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-background-card border border-border px-4 py-2 rounded-xl text-center">
              <div className="text-2xl font-bold text-primary">{orders.length}</div>
              <div className="text-[10px] uppercase text-foreground-dim">Total Orders</div>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="p-3 rounded-xl bg-background-elevated border border-border hover:border-primary/50 transition-all"
              title="Refresh Orders"
            >
              🔄
            </button>
            <button 
              onClick={handleLogout}
              className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-white transition-all text-xs font-bold uppercase"
            >
              Logout
            </button>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-background-card rounded-3xl border border-dashed border-border">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-foreground-muted">Incoming orders will appear here automatically.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-background-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className="p-5 sm:p-6 flex flex-col lg:flex-row gap-6">
                  {/* Order Meta */}
                  <div className="lg:w-1/4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-primary font-bold">{order.id}</span>
                      <span className="badge badge-success text-[10px] uppercase">{order.status}</span>
                    </div>
                    <div className="text-lg font-bold mb-1">{order.customer.name}</div>
                    <div className="text-sm text-foreground-muted mb-4">{order.customer.phone}</div>
                    <div className="text-xs text-foreground-dim">
                      {new Date(order.timestamp).toLocaleString("pl-PL")}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="lg:w-2/4 bg-background/50 rounded-xl p-4 border border-border/50">
                    <h3 className="text-xs font-bold uppercase text-foreground-dim mb-3 tracking-widest">Order Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-foreground-muted">
                            <span className="font-bold text-primary mr-2">{item.quantity}x</span>
                            {item.name}
                          </span>
                          <span className="font-medium">{(item.price * item.quantity).toFixed(2)} zł</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                      <span className="text-xs font-bold uppercase text-foreground-dim">Total Amount</span>
                      <span className="text-lg font-bold text-primary">{order.total.toFixed(2)} zł</span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="lg:w-1/4">
                    <h3 className="text-xs font-bold uppercase text-foreground-dim mb-3 tracking-widest">Delivery Address</h3>
                    <p className="text-sm leading-relaxed mb-4">{order.customer.address}</p>
                    {order.customer.notes && (
                      <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
                        <div className="text-[10px] uppercase font-bold text-accent mb-1">Notes:</div>
                        <p className="text-xs italic">{order.customer.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

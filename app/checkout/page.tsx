/*"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: cartTotal,
        phone: formData.phone,
        address: formData.address,
        status: "pending",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        // Send WhatsApp message
        const phone = "2547XXXXXXXX"; // Replace with actual phone
        const message = `New Order:
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
Items:
${cart.map((item) => `- ${item.name} x${item.quantity} = KSh ${item.price * item.quantity}`).join('\n')}
Total: KSh ${cartTotal}
Notes: ${formData.notes || 'None'}`;

        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        
        clearCart();
        
        // Redirect to success page with WhatsApp link
        router.push(`/checkout/success?whatsapp=${encodeURIComponent(whatsappUrl)}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div>

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Check<span className="text-[#e8b924]">out</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form *
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block font-medium mb-2">
                Phone Number (M-Pesa) *
              </label>
              <input
                type="tel"
                id="phone"
                required
                placeholder="e.g., 0712345678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
              />
            </div>

            <div>
              <label htmlFor="address" className="block font-medium mb-2">
                Delivery Address *
              </label>
              <textarea
                id="address"
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                placeholder="Enter your full delivery address"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block font-medium mb-2">
                Order Notes (Optional)
              </label>
              <textarea
                id="notes"
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                placeholder="Any special instructions?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary *
        <div>
          <div className="bg-[#fcf8d6] p-6 rounded-lg sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#d5c37d] pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-[#e8b924]">
                  KSh {cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-4 text-sm text-[#4d4d4d]">
              <p>Payment will be arranged via M-Pesa after order confirmation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}*/

"use client";

import { useState, useEffect } from "react"; // Add useEffect import
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  // Move the redirect logic into useEffect
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart.length, router]);

  // Show loading state or nothing while checking cart/redirecting
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Redirecting to cart...</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: cartTotal,
        phone: formData.phone,
        address: formData.address,
        status: "pending",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        // Send WhatsApp message
        const phone = "2547XXXXXXXX"; // Replace with actual phone
        const message = `New Order:
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
Items:
${cart.map((item) => `- ${item.name} x${item.quantity} = KSh ${item.price * item.quantity}`).join('\n')}
Total: KSh ${cartTotal}
Notes: ${formData.notes || 'None'}`;

        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        
        clearCart();
        
        // Redirect to success page with WhatsApp link
        router.push(`/checkout/success?whatsapp=${encodeURIComponent(whatsappUrl)}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Check<span className="text-[#e8b924]">out</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-medium mb-2">
                  Phone Number (M-Pesa) *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  placeholder="e.g., 0712345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                />
              </div>

              <div>
                <label htmlFor="address" className="block font-medium mb-2">
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                  placeholder="Enter your full delivery address"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block font-medium mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                  placeholder="Any special instructions?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[#fcf8d6] p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#d5c37d] pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#e8b924]">
                    KSh {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 text-sm text-[#4d4d4d]">
                <p>Payment will be arranged via M-Pesa after order confirmation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
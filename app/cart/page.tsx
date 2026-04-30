"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[#b9b9b9]" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-[#4d4d4d] mb-8">
          Looks like you haven't added anything to your cart yet
        </p>
        <Link
          href="/products"
          className="inline-block bg-[#e8b924] text-[#0e0e10] px-8 py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Shopping <span className="text-[#e8b924]">Cart</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center space-x-4 border-b border-[#d5c37d] py-4 last:border-0"
            >
              {/* Product Image */}
              <div className="relative w-24 h-24 bg-[#f6e9a6] rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#4d4d4d] text-xs">
                    No image
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <Link
                  href={`/products/${item.productId}`}
                  className="font-semibold hover:text-[#e8b924] transition"
                >
                  {item.name}
                </Link>
                <p className="text-[#e8b924] font-bold mt-1">
                  KSh {item.price.toLocaleString()}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="p-1 border border-[#d5c37d] rounded hover:bg-[#f6e9a6] transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="p-1 border border-[#d5c37d] rounded hover:bg-[#f6e9a6] transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right min-w-[100px]">
                <p className="font-semibold">
                  KSh {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#fcf8d6] p-6 rounded-lg sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>KSh {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#4d4d4d]">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-[#d5c37d] pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-[#e8b924]">
                  KSh {cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-[#e8b924] text-[#0e0e10] text-center py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition mb-3"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/products"
              className="block w-full border-2 border-[#e8b924] text-[#0e0e10] text-center py-3 rounded-lg font-semibold hover:bg-[#e8b924] transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}
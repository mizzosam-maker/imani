"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, MessageCircle } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const whatsappUrl = searchParams.get("whatsapp");

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-[#4d4d4d] mb-8">
          Thank you for your order. We'll contact you shortly to confirm the details.
        </p>

        {whatsappUrl && (
          <a
            href={decodeURIComponent(whatsappUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#128C7E] transition mb-4"
          >
            <MessageCircle className="w-5 h-5" />
            <span>View Order on WhatsApp</span>
          </a>
        )}

        <div className="space-x-4">
          <Link
            href="/products"
            className="inline-block bg-[#e8b924] text-[#0e0e10] px-6 py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full mx-auto mb-8 animate-pulse" />
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
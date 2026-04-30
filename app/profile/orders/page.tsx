"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Calendar, MapPin, Phone } from "lucide-react";

interface Order {
  _id: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: "pending" | "paid" | "delivered";
  phone: string;
  address: string;
  createdAt: string;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        My <span className="text-[#e8b924]">Orders</span>
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-[#fcf8d6] rounded-lg">
          <Package className="w-16 h-16 mx-auto mb-4 text-[#b9b9b9]" />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-[#4d4d4d] mb-6">
            Looks like you haven't placed any orders yet
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#e8b924] text-[#0e0e10] px-6 py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-[#fcf8d6] rounded-lg p-6">
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-[#4d4d4d]">
                    Order #: {order._id.slice(-8)}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-4 h-4 text-[#4d4d4d]" />
                    <span className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="border-t border-[#d5c37d] pt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm mb-2">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>KSh {item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#d5c37d] mt-4 pt-4">
                <div className="flex justify-between font-bold text-lg mb-2">
                  <span>Total</span>
                  <span className="text-[#e8b924]">
                    KSh {order.total.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-[#4d4d4d]">
                  <div className="flex items-start space-x-2">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{order.phone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{order.address}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
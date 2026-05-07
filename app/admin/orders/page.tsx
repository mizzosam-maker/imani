/*"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Search, Filter, Eye, Trash2, CheckCircle, Clock, Truck } from "lucide-react";

interface Order {
  _id: string;
  userId?: string;
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

export default function AdminOrdersPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    fetchOrders();
  }, [user, isAdmin]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setOrders(orders.map(order => 
          order._id === id ? { ...order, status: status as any } : order
        ));
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setOrders(orders.filter(order => order._id !== id));
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "delivered":
        return <Truck className="w-4 h-4 text-blue-600" />;
      default:
        return null;
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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search) ||
      order.address.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        Manage <span className="text-[#e8b924]">Orders</span>
      </h1>

      {/* Filters *
      <div className="bg-[#fcf8d6] p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4d4d4d]" />
            <input
              type="text"
              placeholder="Search by order ID, phone, or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4d4d4d]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3] appearance-none"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table *
      <div className="bg-[#fcf8d6] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#e8b924] text-[#0e0e10]">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Items</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d5c37d]">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-[#f6e9a6] transition">
                  <td className="px-4 py-3 font-mono text-sm">
                    #{order._id.slice(-8)}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">{order.phone}</div>
                      <div className="text-sm text-[#4d4d4d]">{order.address}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm">
                          {item.name} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold">
                    KSh {order.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className={`px-2 py-1 rounded-lg text-sm font-medium ${getStatusColor(order.status)} border-0 focus:ring-2 focus:ring-[#e8b924]`}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="p-1 text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[#4d4d4d]">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}*/

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Search, Filter, Eye, Trash2, CheckCircle, Clock, Truck, ChevronDown, ChevronUp } from "lucide-react";

interface Order {
  _id: string;
  userId?: string;
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

export default function AdminOrdersPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    fetchOrders();
  }, [user, isAdmin]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setOrders(orders.map(order => 
          order._id === id ? { ...order, status: status as any } : order
        ));
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setOrders(orders.filter(order => order._id !== id));
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "delivered":
        return <Truck className="w-4 h-4 text-blue-600" />;
      default:
        return null;
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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search) ||
      order.address.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
        Manage <span className="text-[#e8b924]">Orders</span>
      </h1>

      {/* Filters */}
      <div className="bg-[#fcf8d6] p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#4d4d4d]" />
            <input
              type="text"
              placeholder="Search by order ID, phone, or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#4d4d4d]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3] appearance-none"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table View (hidden on mobile) */}
      <div className="hidden md:block bg-[#fcf8d6] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#e8b924] text-[#0e0e10]">
              <tr>
                <th className="px-4 py-3 text-left text-sm">Order ID</th>
                <th className="px-4 py-3 text-left text-sm">Date</th>
                <th className="px-4 py-3 text-left text-sm">Customer</th>
                <th className="px-4 py-3 text-left text-sm">Items</th>
                <th className="px-4 py-3 text-left text-sm">Total</th>
                <th className="px-4 py-3 text-left text-sm">Status</th>
                <th className="px-4 py-3 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d5c37d]">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-[#f6e9a6] transition">
                  <td className="px-4 py-3 font-mono text-xs sm:text-sm">
                    #{order._id.slice(-8)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-sm">{order.phone}</div>
                      <div className="text-xs text-[#4d4d4d]">{order.address}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="text-xs">
                          {item.name} x{item.quantity}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-xs text-[#4d4d4d]">
                          +{order.items.length - 2} more
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-sm">
                    KSh {order.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className={`px-2 py-1 rounded-lg text-xs sm:text-sm font-medium ${getStatusColor(order.status)} border-0 focus:ring-2 focus:ring-[#e8b924] cursor-pointer`}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="p-1 text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View (visible only on mobile) */}
      <div className="md:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div key={order._id} className="bg-[#fcf8d6] rounded-lg border border-[#d5c37d] overflow-hidden">
            {/* Order Header */}
            <div 
              className="p-4 bg-[#f6e9a6] cursor-pointer flex justify-between items-center"
              onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
            >
              <div>
                <div className="font-mono text-sm font-bold">
                  #{order._id.slice(-8)}
                </div>
                <div className="text-xs text-[#4d4d4d] mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                {expandedOrder === order._id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>

            {/* Order Details (expanded) */}
            {expandedOrder === order._id && (
              <div className="p-4 space-y-3">
                {/* Customer Info */}
                <div className="border-b border-[#d5c37d] pb-2">
                  <h4 className="font-semibold text-sm mb-2">Customer Information</h4>
                  <div className="text-sm">
                    <div>📞 {order.phone}</div>
                    <div className="text-[#4d4d4d] text-xs mt-1">📍 {order.address}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="border-b border-[#d5c37d] pb-2">
                  <h4 className="font-semibold text-sm mb-2">Items ({order.items.length})</h4>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>
                          {item.name} <span className="text-[#4d4d4d]">x{item.quantity}</span>
                        </span>
                        <span className="font-medium">
                          KSh {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-b border-[#d5c37d] pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">Total Amount</span>
                    <span className="font-bold text-[#e8b924] text-base">
                      KSh {order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Status Update */}
                <div className="pb-2">
                  <label className="font-semibold text-sm mb-2 block">Update Status</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(order.status)} border border-[#d5c37d] focus:ring-2 focus:ring-[#e8b924] cursor-pointer`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete Order</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-[#4d4d4d]">No orders found</p>
        </div>
      )}

      {/* Order Count */}
      {filteredOrders.length > 0 && (
        <div className="mt-4 text-center text-sm text-[#4d4d4d]">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      )}
    </div>
  );
}
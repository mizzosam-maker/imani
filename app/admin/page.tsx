/*"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Users, ShoppingBag, MessageSquare, Plus, Edit, Trash2 } from "lucide-react";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalMessages: number;
}

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalMessages: 0,
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    fetchStats();
  }, [user, isAdmin]);

  const fetchStats = async () => {
    try {
      // Fetch products
      const productsRes = await fetch("/api/products");
      const products = await productsRes.json();
      
      // Fetch orders
      const ordersRes = await fetch("/api/orders");
      const orders = await ordersRes.json();
      
      // Fetch users
      const usersRes = await fetch("/api/admin/users");
      const users = await usersRes.json();
      
      // Fetch messages
      const messagesRes = await fetch("/api/messages");
      const messages = await messagesRes.json();

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalMessages: messages.length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
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
        Admin <span className="text-[#e8b924]">Dashboard</span>
      </h1>

      {/* Stats Cards *
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#fcf8d6] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-[#e8b924]" />
            <span className="text-2xl font-bold">{stats.totalProducts}</span>
          </div>
          <h3 className="font-medium">Total Products</h3>
        </div>

        <div className="bg-[#fcf8d6] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-8 h-8 text-[#e8b924]" />
            <span className="text-2xl font-bold">{stats.totalOrders}</span>
          </div>
          <h3 className="font-medium">Total Orders</h3>
        </div>

        <div className="bg-[#fcf8d6] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-[#e8b924]" />
            <span className="text-2xl font-bold">{stats.totalUsers}</span>
          </div>
          <h3 className="font-medium">Total Users</h3>
        </div>

        <div className="bg-[#fcf8d6] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <MessageSquare className="w-8 h-8 text-[#e8b924]" />
            <span className="text-2xl font-bold">{stats.totalMessages}</span>
          </div>
          <h3 className="font-medium">Messages</h3>
        </div>
      </div>

      {/* Quick Actions *
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/products/new"
          className="bg-[#fcf8d6] p-4 rounded-lg hover:bg-[#f6e9a6] transition flex items-center space-x-3"
        >
          <Plus className="w-5 h-5 text-[#e8b924]" />
          <span>Add New Product</span>
        </Link>

        <Link
          href="/admin/products"
          className="bg-[#fcf8d6] p-4 rounded-lg hover:bg-[#f6e9a6] transition flex items-center space-x-3"
        >
          <Edit className="w-5 h-5 text-[#e8b924]" />
          <span>Manage Products</span>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-[#fcf8d6] p-4 rounded-lg hover:bg-[#f6e9a6] transition flex items-center space-x-3"
        >
          <ShoppingBag className="w-5 h-5 text-[#e8b924]" />
          <span>Manage Orders</span>
        </Link>

        <Link
          href="/admin/users"
          className="bg-[#fcf8d6] p-4 rounded-lg hover:bg-[#f6e9a6] transition flex items-center space-x-3"
        >
          <Users className="w-5 h-5 text-[#e8b924]" />
          <span>Manage Users</span>
        </Link>
      </div>
    </div>
  );
}*/

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Users, ShoppingBag, MessageSquare, Plus, Edit, Trash2 } from "lucide-react";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalMessages: number;
}

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Don't do anything while auth is loading
    if (authLoading) return;
    
    // Check authentication after auth is done loading
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    
    // If authenticated and admin, fetch stats
    fetchStats();
  }, [user, isAdmin, authLoading, router]);

  const fetchStats = async () => {
    try {
      // Fetch products
      const productsRes = await fetch("/api/products");
      const products = await productsRes.json();
      
      // Fetch orders
      const ordersRes = await fetch("/api/orders");
      const orders = await ordersRes.json();
      
      // Fetch users
      const usersRes = await fetch("/api/admin/users");
      const users = await usersRes.json();
      
      // Fetch messages
      const messagesRes = await fetch("/api/messages");
      const messages = await messagesRes.json();

      setStats({
        totalProducts: products.length || 0,
        totalOrders: orders.length || 0,
        totalUsers: users.length || 0,
        totalMessages: messages.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while auth is checking OR while fetching stats
  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin <span className="text-[#e8b924]">Dashboard</span>
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#fcf8d6] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-[#e8b924]" />
            <span className="text-2xl font-bold">{stats.totalProducts}</span>
          </div>
          <h3 className="font-medium">Total Products</h3>
        </div>

        <div className="bg-[#fcf8d6] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-8 h-8 text-[#e8b924]" />
            <span className="text-2xl font-bold">{stats.totalOrders}</span>
          </div>
          <h3 className="font-medium">Total Orders</h3>
        </div>

        <div className="bg-[#fcf8d6] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-[#e8b924]" />
            <span className="text-2xl font-bold">{stats.totalUsers}</span>
          </div>
          <h3 className="font-medium">Total Users</h3>
        </div>

        <div className="bg-[#fcf8d6] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <MessageSquare className="w-8 h-8 text-[#e8b924]" />
            <span className="text-2xl font-bold">{stats.totalMessages}</span>
          </div>
          <h3 className="font-medium">Messages</h3>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/products/new"
          className="bg-[#fcf8d6] p-4 rounded-lg hover:bg-[#f6e9a6] transition flex items-center space-x-3"
        >
          <Plus className="w-5 h-5 text-[#e8b924]" />
          <span>Add New Product</span>
        </Link>

        <Link
          href="/admin/products"
          className="bg-[#fcf8d6] p-4 rounded-lg hover:bg-[#f6e9a6] transition flex items-center space-x-3"
        >
          <Edit className="w-5 h-5 text-[#e8b924]" />
          <span>Manage Products</span>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-[#fcf8d6] p-4 rounded-lg hover:bg-[#f6e9a6] transition flex items-center space-x-3"
        >
          <ShoppingBag className="w-5 h-5 text-[#e8b924]" />
          <span>Manage Orders</span>
        </Link>

        <Link
          href="/admin/users"
          className="bg-[#fcf8d6] p-4 rounded-lg hover:bg-[#f6e9a6] transition flex items-center space-x-3"
        >
          <Users className="w-5 h-5 text-[#e8b924]" />
          <span>Manage Users</span>
        </Link>
      </div>
    </div>
  );
}
/*"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Menu, X, ShoppingCart } from "lucide-react";

const categories = [
  "Home Decor",
  "Kitchen",
  "Dining",
  "Shoes",
  "Bags",
  "Clothing",
  "Beauty",
  "Drinkware",
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-[#fafaf3] border-b border-[#d5c37d] sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo *
          <Link href="/" className="text-2xl font-bold text-[#e8b924]">
            Imani Imports
          </Link>

          {/* Desktop Navigation *
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#0e0e10] hover:text-[#e8b924] transition">
              Home
            </Link>
            <Link href="/products" className="text-[#0e0e10] hover:text-[#e8b924] transition">
              All Products
            </Link>
            <div className="relative group">
              <button className="text-[#0e0e10] hover:text-[#e8b924] transition">
                Categories
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#fafaf3] border border-[#d5c37d] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block px-4 py-2 text-[#0e0e10] hover:bg-[#f6e9a6] transition"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/contact" className="text-[#0e0e10] hover:text-[#e8b924] transition">
              Contact
            </Link>
          </div>

          {/* Right Section *
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-[#0e0e10] hover:text-[#e8b924] transition" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e8b924] text-[#0e0e10] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button *
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#0e0e10]" />
              ) : (
                <Menu className="w-6 h-6 text-[#0e0e10]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation *
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-[#0e0e10] hover:text-[#e8b924] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-2 text-[#0e0e10] hover:text-[#e8b924] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <div className="py-2">
              <p className="font-semibold mb-2">Categories</p>
              <div className="pl-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block text-[#0e0e10] hover:text-[#e8b924] transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              className="block py-2 text-[#0e0e10] hover:text-[#e8b924] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}*/

"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, ShoppingCart, User, LogOut, Package, Settings } from "lucide-react";

const categories = [
  "Home Decor",
  "Kitchen",
  "Dining",
  "Shoes",
  "Bags",
  "Clothing",
  "Beauty",
  "Drinkware",
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout, isAdmin } = useAuth();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-[#fafaf3] border-b border-[#d5c37d] sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#e8b924]">
            Imani Imports
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#0e0e10] hover:text-[#e8b924] transition">
              Home
            </Link>
            <Link href="/products" className="text-[#0e0e10] hover:text-[#e8b924] transition">
              All Products
            </Link>
            <div className="relative group">
              <button className="text-[#0e0e10] hover:text-[#e8b924] transition">
                Categories
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#fafaf3] border border-[#d5c37d] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block px-4 py-2 text-[#0e0e10] hover:bg-[#f6e9a6] transition"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/contact" className="text-[#0e0e10] hover:text-[#e8b924] transition">
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-[#0e0e10] hover:text-[#e8b924] transition" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e8b924] text-[#0e0e10] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <div className="w-8 h-8 bg-[#e8b924] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#0e0e10]" />
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#fafaf3] border border-[#d5c37d] rounded-lg shadow-lg py-2">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-[#d5c37d]">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-[#4d4d4d]">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6] transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        href="/profile/orders"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6] transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        <span>My Orders</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6] transition"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6] transition w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-[#f6e9a6] transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 hover:bg-[#f6e9a6] transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#0e0e10]" />
              ) : (
                <Menu className="w-6 h-6 text-[#0e0e10]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-[#0e0e10] hover:text-[#e8b924] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-2 text-[#0e0e10] hover:text-[#e8b924] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <div className="py-2">
              <p className="font-semibold mb-2">Categories</p>
              <div className="pl-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block text-[#0e0e10] hover:text-[#e8b924] transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              className="block py-2 text-[#0e0e10] hover:text-[#e8b924] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
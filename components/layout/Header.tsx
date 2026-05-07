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

/*"use client";

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
            {/* Cart *
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-[#0e0e10] hover:text-[#e8b924] transition" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e8b924] text-[#0e0e10] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu *
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


/*"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Package,
  Settings,
} from "lucide-react";

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

  const userMenuRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

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
            <Link href="/" className="text-[#0e0e10] hover:text-[#e8b924]">
              Home
            </Link>
            <Link
              href="/products"
              className="text-[#0e0e10] hover:text-[#e8b924]"
            >
              All Products
            </Link>

            <div className="relative group">
              <button className="text-[#0e0e10] hover:text-[#e8b924]">
                Categories
              </button>

              <div className="absolute top-full left-0 mt-2 w-48 bg-[#fafaf3] border border-[#d5c37d] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(
                      category
                    )}`}
                    className="block px-4 py-2 hover:bg-[#f6e9a6]"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="text-[#0e0e10] hover:text-[#e8b924]"
            >
              Contact
            </Link>
          </div>

          {/* Right Section *
          <div className="flex items-center space-x-4">
            {/* Cart *
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-[#0e0e10]" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e8b924] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu *
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center space-x-1"
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
                        <p className="text-sm text-[#4d4d4d]">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6]"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/profile/orders"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6]"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        <span>My Orders</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6]"
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
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6] w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-[#f6e9a6]"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 hover:bg-[#f6e9a6]"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button *
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation *
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/products" onClick={() => setIsMenuOpen(false)}>
              All Products
            </Link>

            <div className="py-2">
              <p className="font-semibold mb-2">Categories</p>
              <div className="pl-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(
                      category
                    )}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
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
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Package,
  Settings,
  ChevronDown,
} from "lucide-react";

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
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

  const { cart } = useCart();
  const { user, logout, isAdmin } = useAuth();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-[#fafaf3] border-b border-[#d5c37d] sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#e8b924] flex-shrink-0">
            Imani Imports
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-[#0e0e10] hover:text-[#e8b924]">
              Home
            </Link>
            <Link
              href="/products"
              className="text-[#0e0e10] hover:text-[#e8b924]"
            >
              All Products
            </Link>

            <div className="relative group">
              <button className="text-[#0e0e10] hover:text-[#e8b924] flex items-center gap-1">
                Categories <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute top-full left-0 mt-2 w-48 bg-[#fafaf3] border border-[#d5c37d] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(
                      category
                    )}`}
                    className="block px-4 py-2 hover:bg-[#f6e9a6]"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="text-[#0e0e10] hover:text-[#e8b924]"
            >
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-[#0e0e10]" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e8b924] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu - Desktop (now always visible on md and up) */}
            <div className="relative hidden md:block" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center space-x-1"
              >
                <div className="w-8 h-8 bg-[#e8b924] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#0e0e10]" />
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#fafaf3] border border-[#d5c37d] rounded-lg shadow-lg py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-[#d5c37d]">
                        <p className="font-semibold truncate">{user.name}</p>
                        <p className="text-sm text-[#4d4d4d] truncate">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6]"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/profile/orders"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6]"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        <span>My Orders</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6]"
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
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-[#f6e9a6] w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-[#f6e9a6]"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 hover:bg-[#f6e9a6]"
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
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <div 
              ref={mobileMenuRef}
              className="fixed top-[73px] left-0 right-0 bottom-0 bg-[#fafaf3] z-50 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col p-4 space-y-4">
                <Link 
                  href="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 text-[#0e0e10] hover:text-[#e8b924] border-b border-[#d5c37d]"
                >
                  Home
                </Link>
                
                <Link 
                  href="/products" 
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 text-[#0e0e10] hover:text-[#e8b924] border-b border-[#d5c37d]"
                >
                  All Products
                </Link>

                {/* Mobile Categories Dropdown */}
                <div className="border-b border-[#d5c37d]">
                  <button
                    onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                    className="w-full py-2 text-[#0e0e10] flex justify-between items-center"
                  >
                    <span>Categories</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${
                        isMobileCategoriesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {isMobileCategoriesOpen && (
                    <div className="pl-4 pb-2 space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href={`/products?category=${encodeURIComponent(category)}`}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileCategoriesOpen(false);
                          }}
                          className="block py-2 text-[#0e0e10] hover:text-[#e8b924]"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link 
                  href="/contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 text-[#0e0e10] hover:text-[#e8b924] border-b border-[#d5c37d]"
                >
                  Contact
                </Link>

                {/* Mobile User Section */}
                <div className="pt-4 border-t border-[#d5c37d]">
                  {user ? (
                    <>
                      <div className="mb-4 p-3 bg-[#f6e9a6] rounded-lg">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-[#4d4d4d]">{user.email}</p>
                      </div>
                      
                      <Link
                        href="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-2 py-3 text-[#0e0e10] hover:text-[#e8b924]"
                      >
                        <Package className="w-5 h-5" />
                        <span>My Profile</span>
                      </Link>

                      <Link
                        href="/profile/orders"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-2 py-3 text-[#0e0e10] hover:text-[#e8b924]"
                      >
                        <Package className="w-5 h-5" />
                        <span>My Orders</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center space-x-2 py-3 text-[#0e0e10] hover:text-[#e8b924]"
                        >
                          <Settings className="w-5 h-5" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 py-3 text-[#0e0e10] hover:text-[#e8b924] w-full"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 text-[#0e0e10] hover:text-[#e8b924]"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 text-[#0e0e10] hover:text-[#e8b924]"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
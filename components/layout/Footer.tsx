import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e10] text-[#fafaf3] mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-[#e8b924] mb-4">Imani Imports</h3>
            <p className="text-[#b9b9b9] mb-4">
              Your premier destination for quality home essentials, fashion, and decor in Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#e8b924]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-[#b9b9b9] hover:text-[#e8b924] transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-[#b9b9b9] hover:text-[#e8b924] transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#b9b9b9] hover:text-[#e8b924] transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-[#e8b924]">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=Home Decor" className="text-[#b9b9b9] hover:text-[#e8b924] transition">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link href="/products?category=Kitchen" className="text-[#b9b9b9] hover:text-[#e8b924] transition">
                  Kitchen
                </Link>
              </li>
              <li>
                <Link href="/products?category=Shoes" className="text-[#b9b9b9] hover:text-[#e8b924] transition">
                  Shoes
                </Link>
              </li>
              <li>
                <Link href="/products?category=Bags" className="text-[#b9b9b9] hover:text-[#e8b924] transition">
                  Bags
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-[#e8b924]">Contact Us</h4>
            <ul className="space-y-2 text-[#b9b9b9]">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+254 7XX XXX XXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@imaniimports.co.ke</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#4d4d4d] mt-8 pt-8 text-center text-[#b9b9b9]">
          <p>&copy; {new Date().getFullYear()} Imani Imports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
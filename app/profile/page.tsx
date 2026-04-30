"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";

export default function ProfilePage() {
  const { user, updateProfile, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    //phone: user?.phone || "",
    //address: user?.address || "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await updateProfile(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        My <span className="text-[#e8b924]">Profile</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-[#fcf8d6] p-6 rounded-lg sticky top-24">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-[#e8b924] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-[#0e0e10]" />
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-[#4d4d4d]">{user.email}</p>
            </div>

            <nav className="space-y-2">
              <a
                href="/profile"
                className="block px-4 py-2 bg-[#e8b924] text-[#0e0e10] rounded-lg font-medium"
              >
                Profile Information
              </a>
              <a
                href="/profile/orders"
                className="block px-4 py-2 hover:bg-[#f6e9a6] rounded-lg transition"
              >
                My Orders
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-[#fcf8d6] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                Profile updated successfully!
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4d4d4d]" />
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4d4d4d]" />
                  <input
                    type="email"
                    id="email"
                    value={user.email}
                    disabled
                    className="w-full pl-10 pr-4 py-2 border border-[#d5c37d] rounded-lg bg-[#f0f0e8] cursor-not-allowed"
                  />
                </div>
                <p className="text-sm text-[#4d4d4d] mt-1">Email cannot be changed</p>
              </div>

              {/*<div>
                <label htmlFor="phone" className="block font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4d4d4d]" />
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g., 0712345678"
                    className="w-full pl-10 pr-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block font-medium mb-2">
                  Delivery Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#4d4d4d]" />
                  <textarea
                    id="address"
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your delivery address"
                    className="w-full pl-10 pr-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                  />
                </div>
              </div>*/}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{loading ? "Saving..." : "Save Changes"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
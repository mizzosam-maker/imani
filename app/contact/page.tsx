"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const phone = "2547XXXXXXXX"; // Replace with actual phone
    const message = `Hello, I have a question about your products.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div>

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12">
        Contact <span className="text-[#e8b924]">Us</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#f6e9a6] rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#e8b924]" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-[#4d4d4d]">+254 7XX XXX XXX</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#f6e9a6] rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#e8b924]" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-[#4d4d4d]">info@imaniimports.co.ke</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#f6e9a6] rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#e8b924]" />
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-[#4d4d4d]">Nairobi, Kenya</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-[#128C7E] transition flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
          
          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
              <p>Message sent successfully! We'll get back to you soon.</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Name *
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
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-2">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>

    </div>
  );
}
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome <span className="text-[#e8b924]">Back</span>
        </h1>

        <div className="bg-[#fcf8d6] p-8 rounded-lg">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-4 text-[#4d4d4d]">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#e8b924] hover:text-[#ddc25d]">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
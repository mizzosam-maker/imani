"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, X } from "lucide-react";

const categories = [
  "Home Decor",
  "Kitchen",
  "Kitchen Storage",
  "Dining",
  "Drinkware",
  "Shoes",
  "Bags",
  "Clothing",
  "Bathroom",
  "Beauty",
  "Accessories",
  "Seasonal Decor",
  "Furniture",
  "Lighting",
  "Home Appliance",
  "Home",
];

export default function NewProductPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "10",
    variants: [""],
    images: [""],
    featured: false,
  });

  if (!user || !isAdmin) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Filter out empty variants and images
      const variants = formData.variants.filter(v => v.trim() !== "");
      const images = formData.images.filter(i => i.trim() !== "");

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        variants: variants.length > 0 ? variants : undefined,
        images: images.length > 0 ? images : undefined,
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, ""],
    });
  };

  const removeVariant = (index: number) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  const updateVariant = (index: number, value: string) => {
    const newVariants = [...formData.variants];
    newVariants[index] = value;
    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  const addImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Add New <span className="text-[#e8b924]">Product</span>
        </h1>

        <div className="bg-[#fcf8d6] p-6 rounded-lg">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Product Name *
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block font-medium mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block font-medium mb-2">
                  Price (KSh) *
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="stock" className="block font-medium mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stock"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 mt-8">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-[#e8b924] focus:ring-[#e8b924] border-[#d5c37d] rounded"
                  />
                  <span className="font-medium">Featured Product</span>
                </label>
              </div>
            </div>

            {/* Variants */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">Variants</label>
                <button
                  type="button"
                  onClick={addVariant}
                  className="text-sm text-[#e8b924] hover:text-[#ddc25d]"
                >
                  + Add Variant
                </button>
              </div>
              {formData.variants.map((variant, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={variant}
                    onChange={(e) => updateVariant(index, e.target.value)}
                    placeholder="e.g., Large, Black, etc."
                    className="flex-1 px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                  />
                  {formData.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Images */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">Image URLs</label>
                <button
                  type="button"
                  onClick={addImage}
                  className="text-sm text-[#e8b924] hover:text-[#ddc25d]"
                >
                  + Add Image URL
                </button>
              </div>
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{loading ? "Saving..." : "Save Product"}</span>
              </button>
              <Link
                href="/admin/products"
                className="flex-1 border-2 border-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#e8b924] transition text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
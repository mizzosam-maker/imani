/*"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
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

export default function EditProductPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    variants: [""],
    images: [""],
    featured: false,
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    fetchProduct();
  }, [user, isAdmin, params.id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      const product = await res.json();

      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price?.toString() || "",
        description: product.description || "",
        stock: product.stock?.toString() || "10",
        variants: product.variants?.length ? product.variants : [""],
        images: product.images?.length ? product.images : [""],
        featured: product.featured || false,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product");
    } finally {
      setFetching(false);
    }
  };

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

      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update product");
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

  if (fetching) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Edit <span className="text-[#e8b924]">Product</span>
        </h1>

        <div className="bg-[#fcf8d6] p-6 rounded-lg">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Same form fields as new product page *
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

            {/* Variants *
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

            {/* Images *
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

            {/* Submit Buttons *
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{loading ? "Saving..." : "Update Product"}</span>
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
}*/

/*"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Save, X, Plus, Upload } from "lucide-react";

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

export default function EditProductPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    variants: [""],
    images: [""],
    featured: false,
  });

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    fetchProduct();
  }, [user, isAdmin, authLoading, params.id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      if (!res.ok) {
        throw new Error("Product not found");
      }
      const product = await res.json();

      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price?.toString() || "",
        description: product.description || "",
        stock: product.stock?.toString() || "10",
        variants: product.variants?.length ? product.variants : [""],
        images: product.images?.length ? product.images : [""],
        featured: product.featured || false,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.category || !formData.price) {
        throw new Error("Please fill in all required fields");
      }

      // Filter out empty variants and images
      const variants = formData.variants.filter(v => v.trim() !== "");
      const images = formData.images.filter(i => i.trim() !== "");

      const productData = {
        name: formData.name.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        stock: parseInt(formData.stock),
        variants: variants.length > 0 ? variants : undefined,
        images: images.length > 0 ? images : undefined,
        featured: formData.featured,
      };

      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update product");
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

  // Show loading while auth is checking or fetching product
  if (authLoading || fetching) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  // Don't render if not admin (will redirect via useEffect)
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header *
        <div className="mb-6 sm:mb-8">
          <Link
            href="/admin/products"
            className="text-[#4d4d4d] hover:text-[#e8b924] transition mb-4 inline-block"
          >
            ← Back to Products
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Edit <span className="text-[#e8b924]">Product</span>
          </h1>
          <p className="text-[#4d4d4d] mt-1">Update product information</p>
        </div>

        {/* Form *
        <div className="bg-[#fcf8d6] p-4 sm:p-6 rounded-lg shadow-sm">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info *
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b border-[#d5c37d] pb-2">
                Basic Information
              </h2>
              
              <div>
                <label htmlFor="name" className="block font-medium mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                  placeholder="Enter product name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block font-medium mb-2">
                    Category <span className="text-red-500">*</span>
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
                    Price (KSh) <span className="text-red-500">*</span>
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
                    placeholder="0.00"
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
                  placeholder="Product description..."
                />
              </div>
            </div>

            {/* Inventory *
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b border-[#d5c37d] pb-2">
                Inventory
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="flex items-center">
                  <label className="flex items-center space-x-2 cursor-pointer">
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
            </div>

            {/* Variants *
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#d5c37d] pb-2">
                <h2 className="text-lg font-semibold">Variants</h2>
                <button
                  type="button"
                  onClick={addVariant}
                  className="text-sm bg-[#e8b924] text-[#0e0e10] px-3 py-1 rounded-lg hover:bg-[#ddc25d] transition flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Variant</span>
                </button>
              </div>
              
              {formData.variants.map((variant, index) => (
                <div key={index} className="flex items-center space-x-2">
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
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              
              {formData.variants.length === 1 && !formData.variants[0] && (
                <p className="text-sm text-[#4d4d4d]">Add variants like size, color, or material</p>
              )}
            </div>

            {/* Images *
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#d5c37d] pb-2">
                <h2 className="text-lg font-semibold">Product Images</h2>
                <button
                  type="button"
                  onClick={addImage}
                  className="text-sm bg-[#e8b924] text-[#0e0e10] px-3 py-1 rounded-lg hover:bg-[#ddc25d] transition flex items-center space-x-1"
                >
                  <Upload className="w-4 h-4" />
                  <span>Add Image URL</span>
                </button>
              </div>
              
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
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
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              
              {formData.images.length === 1 && !formData.images[0] && (
                <p className="text-sm text-[#4d4d4d]">Add image URLs for your product</p>
              )}
            </div>

            {/* Preview Section *
            {(formData.images[0] || formData.name || formData.price) && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold border-b border-[#d5c37d] pb-2">
                  Preview
                </h2>

                <div className="bg-[#fafaf3] p-4 rounded-lg">
                  <p className="text-sm text-[#4d4d4d] mb-2">
                    How your product will appear:
                  </p>

                  <div className="flex items-center space-x-4">

                    {/* IMAGE PREVIEW (FIXED) *
                    <div className="w-16 h-16 bg-[#f6e9a6] rounded overflow-hidden flex items-center justify-center">

                      {formData.images?.[0] ? (
                        <img
                          src={formData.images[0]}
                          alt="Preview"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "/images/placeholder.png";
                          }}
                        />
                      ) : (
                        <img
                          src="/images/placeholder.png"
                          alt="placeholder"
                          className="w-8 h-8 opacity-60 grayscale"
                        />
                      )}

                    </div>

                    {/* TEXT INFO *
                    <div>
                      <p className="font-semibold">
                        {formData.name || "Product Name"}
                      </p>

                      <p className="text-[#e8b924] font-bold">
                        KSh{" "}
                        {formData.price
                          ? parseFloat(formData.price).toLocaleString()
                          : "0"}
                      </p>

                      <p className="text-sm text-[#4d4d4d]">
                        {formData.category || "Category"}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons *
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{loading ? "Updating..." : "Update Product"}</span>
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
}*/

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Save, X, Plus } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";


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

export default function EditProductPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    variants: [""],
    images: [] as string[],
    featured: false,
  });

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    fetchProduct();
  }, [user, isAdmin, authLoading, params.id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      if (!res.ok) {
        throw new Error("Product not found");
      }
      const product = await res.json();

      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price?.toString() || "",
        description: product.description || "",
        stock: product.stock?.toString() || "10",
        variants: product.variants?.length ? product.variants : [""],
        images: product.images || [],
        featured: product.featured || false,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.category || !formData.price) {
        throw new Error("Please fill in all required fields");
      }

      // Filter out empty variants
      const variants = formData.variants.filter(v => v.trim() !== "");

      const productData = {
        name: formData.name.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        stock: parseInt(formData.stock),
        variants: variants.length > 0 ? variants : undefined,
        images: formData.images, // Now this contains Cloudinary URLs
        featured: formData.featured,
      };

      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update product");
      }

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImagesUploaded = (newImageUrls: string[]) => {
    setFormData({
      ...formData,
      images: [...formData.images, ...newImageUrls],
    });
  };

  const handleImageRemove = (indexToRemove: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => index !== indexToRemove),
    });
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

  // Show loading while auth is checking or fetching product
  if (authLoading || fetching) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  // Don't render if not admin (will redirect via useEffect)
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/admin/products"
            className="text-[#4d4d4d] hover:text-[#e8b924] transition mb-4 inline-block"
          >
            ← Back to Products
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Edit <span className="text-[#e8b924]">Product</span>
          </h1>
          <p className="text-[#4d4d4d] mt-1">Update product information</p>
        </div>

        {/* Form */}
        <div className="bg-[#fcf8d6] p-4 sm:p-6 rounded-lg shadow-sm">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b border-[#d5c37d] pb-2">
                Basic Information
              </h2>
              
              <div>
                <label htmlFor="name" className="block font-medium mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
                  placeholder="Enter product name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block font-medium mb-2">
                    Category <span className="text-red-500">*</span>
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
                    Price (KSh) <span className="text-red-500">*</span>
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
                    placeholder="0.00"
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
                  placeholder="Product description..."
                />
              </div>
            </div>

            {/* Inventory */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b border-[#d5c37d] pb-2">
                Inventory
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="flex items-center">
                  <label className="flex items-center space-x-2 cursor-pointer">
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
            </div>

            {/* Variants */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#d5c37d] pb-2">
                <h2 className="text-lg font-semibold">Variants</h2>
                <button
                  type="button"
                  onClick={addVariant}
                  className="text-sm bg-[#e8b924] text-[#0e0e10] px-3 py-1 rounded-lg hover:bg-[#ddc25d] transition flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Variant</span>
                </button>
              </div>
              
              {formData.variants.map((variant, index) => (
                <div key={index} className="flex items-center space-x-2">
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
                      className="p-2 text-red-600 hover:text-red-800 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              
              {formData.variants.length === 1 && !formData.variants[0] && (
                <p className="text-sm text-[#4d4d4d]">Add variants like size, color, or material</p>
              )}
            </div>

            {/* Images - Updated with Cloudinary Upload */}
            <div className="space-y-4">
              <div className="border-b border-[#d5c37d] pb-2">
                <h2 className="text-lg font-semibold">Product Images</h2>
              </div>
              
              <ImageUpload
                existingImages={formData.images}
                onImagesUploaded={handleImagesUploaded}
                onImageRemove={handleImageRemove}
                multiple={true}
              />
            </div>

            {/* Preview Section */}
            {(formData.images[0] || formData.name || formData.price) && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold border-b border-[#d5c37d] pb-2">
                  Preview
                </h2>

                <div className="bg-[#fafaf3] p-4 rounded-lg">
                  <p className="text-sm text-[#4d4d4d] mb-2">
                    How your product will appear:
                  </p>

                  <div className="flex items-center space-x-4">
                    {/* IMAGE PREVIEW */}
                    <div className="w-16 h-16 bg-[#f6e9a6] rounded overflow-hidden flex items-center justify-center">
                      {formData.images?.[0] ? (
                        <img
                          src={formData.images[0]}
                          alt="Preview"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "/images/placeholder.png";
                          }}
                        />
                      ) : (
                        <img
                          src="/images/placeholder.png"
                          alt="placeholder"
                          className="w-8 h-8 opacity-60 grayscale"
                        />
                      )}
                    </div>

                    {/* TEXT INFO */}
                    <div>
                      <p className="font-semibold">
                        {formData.name || "Product Name"}
                      </p>
                      <p className="text-[#e8b924] font-bold">
                        KSh{" "}
                        {formData.price
                          ? parseFloat(formData.price).toLocaleString()
                          : "0"}
                      </p>
                      <p className="text-sm text-[#4d4d4d]">
                        {formData.category || "Category"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{loading ? "Updating..." : "Update Product"}</span>
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
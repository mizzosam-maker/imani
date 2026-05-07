/*"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  featured: boolean;
}

export default function AdminProductsPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    fetchProducts();
  }, [user, isAdmin]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map((p: Product) => p.category))];
      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || product.category === category;
    return matchesSearch && matchesCategory;
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Manage <span className="text-[#e8b924]">Products</span>
        </h1>
        <Link
          href="/admin/products/new"
          className="bg-[#e8b924] text-[#0e0e10] px-4 py-2 rounded-lg font-semibold hover:bg-[#ddc25d] transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Filters *
      <div className="bg-[#fcf8d6] p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4d4d4d]" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4d4d4d]" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3] appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table *
      <div className="bg-[#fcf8d6] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#e8b924] text-[#0e0e10]">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Featured</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d5c37d]">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-[#f6e9a6] transition">
                <td className="px-4 py-3">
                  <div className="relative w-12 h-12 bg-[#fafaf3] rounded overflow-hidden flex items-center justify-center">

                    {!imgErrorMap[product._id] && product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        onError={() => {
                          setImgErrorMap((prev) => ({
                            ...prev,
                            [product._id]: true,
                          }));
                        }}
                      />
                    ) : (
                      <Image
                        src="/images/placeholder.png"
                        alt="placeholder"
                        width={32}
                        height={32}
                        className="opacity-60 grayscale"
                      />
                    )}

                  </div>
                </td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">KSh {product.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.featured ? (
                      <span className="bg-[#e8b924] text-xs px-2 py-1 rounded">Featured</span>
                    ) : (
                      <span className="text-[#4d4d4d]">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/products/edit/${product._id}`}
                        className="p-1 text-blue-600 hover:text-blue-800 transition"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[#4d4d4d]">No products found</p>
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
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Search, Filter, ChevronDown, ChevronUp, Package, Tag, DollarSign, Layers } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  featured: boolean;
}

export default function AdminProductsPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

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

    // If authenticated and admin, fetch products
    fetchProducts();
  }, [user, isAdmin, authLoading, router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data);

      // Extract unique categories
      const uniqueCategories = [...new Set(data.map((p: Product) => p.category))];
      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // Show loading while auth is checking OR while fetching products
  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Manage <span className="text-[#e8b924]">Products</span>
        </h1>
        <Link
          href="/admin/products/new"
          className="bg-[#e8b924] text-[#0e0e10] px-4 py-2 rounded-lg font-semibold hover:bg-[#ddc25d] transition flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-[#fcf8d6] p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#4d4d4d]" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#4d4d4d]" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3] appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
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
                <th className="px-4 py-3 text-left text-sm">Image</th>
                <th className="px-4 py-3 text-left text-sm">Name</th>
                <th className="px-4 py-3 text-left text-sm">Category</th>
                <th className="px-4 py-3 text-left text-sm">Price</th>
                <th className="px-4 py-3 text-left text-sm">Stock</th>
                <th className="px-4 py-3 text-left text-sm">Featured</th>
                <th className="px-4 py-3 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d5c37d]">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-[#f6e9a6] transition">
                  <td className="px-4 py-3">
                    <div className="relative w-12 h-12 bg-[#fafaf3] rounded overflow-hidden flex items-center justify-center">
                      {!imgErrorMap[product._id] && product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          onError={() => {
                            setImgErrorMap((prev) => ({
                              ...prev,
                              [product._id]: true,
                            }));
                          }}
                        />
                      ) : (
                        <Image
                          src="/images/placeholder.png"
                          alt="placeholder"
                          width={32}
                          height={32}
                          className="opacity-60 grayscale"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-sm">{product.name}</td>
                  <td className="px-4 py-3 text-sm">{product.category}</td>
                  <td className="px-4 py-3 text-sm font-semibold">KSh {product.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock} left
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.featured ? (
                      <span className="bg-[#e8b924] text-[#0e0e10] text-xs px-2 py-1 rounded font-medium">Featured</span>
                    ) : (
                      <span className="text-[#4d4d4d] text-sm">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/products/edit/${product._id}`}
                        className="p-1 text-blue-600 hover:text-blue-800 transition"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-1 text-red-600 hover:text-red-800 transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View (visible only on mobile) */}
      <div className="md:hidden space-y-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-[#fcf8d6] rounded-lg border border-[#d5c37d] overflow-hidden">
            {/* Product Card Header */}
            <div 
              className="p-4 cursor-pointer flex justify-between items-center hover:bg-[#f6e9a6] transition"
              onClick={() => setExpandedProduct(expandedProduct === product._id ? null : product._id)}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {/* Product Image */}
                <div className="relative w-12 h-12 bg-[#fafaf3] rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                  {!imgErrorMap[product._id] && product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      onError={() => {
                        setImgErrorMap((prev) => ({
                          ...prev,
                          [product._id]: true,
                        }));
                      }}
                    />
                  ) : (
                    <Package className="w-6 h-6 text-[#4d4d4d]" />
                  )}
                </div>
                
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base truncate">{product.name}</div>
                  <div className="text-xs text-[#4d4d4d] truncate">{product.category}</div>
                  <div className="font-bold text-[#e8b924] text-sm mt-1">
                    KSh {product.price.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {product.featured && (
                  <span className="bg-[#e8b924] text-[#0e0e10] text-xs px-2 py-1 rounded font-medium whitespace-nowrap">
                    Featured
                  </span>
                )}
                {expandedProduct === product._id ? (
                  <ChevronUp className="w-5 h-5 text-[#4d4d4d] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#4d4d4d] flex-shrink-0" />
                )}
              </div>
            </div>

            {/* Product Details (expanded) */}
            {expandedProduct === product._id && (
              <div className="p-4 pt-0 space-y-3 border-t border-[#d5c37d]">
                {/* Stock Information */}
                <div className="bg-[#fafaf3] p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-[#4d4d4d]" />
                      <span className="text-sm font-medium">Stock Status</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock === 0 ? "Out of Stock" : `${product.stock} items left`}
                    </span>
                  </div>
                </div>

                {/* Price Details */}
                <div className="bg-[#fafaf3] p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-[#4d4d4d]" />
                      <span className="text-sm font-medium">Price</span>
                    </div>
                    <span className="font-bold text-[#e8b924]">
                      KSh {product.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Category */}
                <div className="bg-[#fafaf3] p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-[#4d4d4d]" />
                    <span className="text-sm font-medium">Category</span>
                    <span className="text-sm text-[#4d4d4d] ml-auto">{product.category}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-2">
                  <Link
                    href={`/admin/products/edit/${product._id}`}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <Package className="w-12 h-12 text-[#4d4d4d] mx-auto mb-3" />
          <p className="text-[#4d4d4d]">No products found matching your criteria</p>
        </div>
      )}

      {/* Product Count */}
      {filteredProducts.length > 0 && (
        <div className="mt-4 text-center text-sm text-[#4d4d4d]">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      )}
    </div>
  );
}
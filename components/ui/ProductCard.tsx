'use client';

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
  };

  return (
    <div className="bg-[#fafaf3] border border-[#d5c37d] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product._id}`}>
        <div className="relative h-64 bg-[#f6e9a6]">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#4d4d4d]">
              No image
            </div>
          )}
          {product.stock < 5 && (
            <span className="absolute top-2 right-2 bg-[#e8b924] text-[#0e0e10] text-xs px-2 py-1 rounded">
              Low Stock
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-[#e8b924] transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-[#4d4d4d] text-sm mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#e8b924]">
            KSh {product.price.toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-[#e8b924] text-[#0e0e10] p-2 rounded-full hover:bg-[#ddc25d] transition"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
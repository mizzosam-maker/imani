import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  name: string;
  image?: string;
  count: number;
}

export default function CategoryCard({ name, image, count }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${encodeURIComponent(name)}`}
      className="block group"
    >
      <div className="relative h-48 rounded-lg overflow-hidden mb-3">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-[#f6e9a6] flex items-center justify-center text-[#4d4d4d]">
            {name}
          </div>
        )}
      </div>
      <h3 className="font-semibold text-center group-hover:text-[#e8b924] transition">
        {name}
      </h3>
      <p className="text-sm text-[#4d4d4d] text-center">{count} products</p>
    </Link>
  );
}
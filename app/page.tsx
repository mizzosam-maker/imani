import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

async function getFeaturedProducts() {
  await connectDB();
  const products = await Product.find({ featured: true }).limit(8).lean();
  return JSON.parse(JSON.stringify(products));
}

async function getCategories() {
  await connectDB();
  const categories = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 8 },
  ]);
  return categories;
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getCategories();

  return (
    <div>

      {/* Hero Section */}
      <section className="relative h-[600px] bg-[#f6e9a6] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e10]/70 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-[#fafaf3]">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Welcome to{" "}
              <span className="text-[#e8b924]">Imani Imports</span>
            </h1>
            <p className="text-xl mb-8 text-[#fcf8d6]">
              Discover quality home essentials, fashion, and decor pieces that
              elevate your lifestyle.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/products"
                className="bg-[#e8b924] text-[#0e0e10] px-8 py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="border-2 border-[#e8b924] text-[#fafaf3] px-8 py-3 rounded-lg font-semibold hover:bg-[#e8b924] hover:text-[#0e0e10] transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by <span className="text-[#e8b924]">Category</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat: any) => (
            <CategoryCard
              key={cat._id}
              name={cat._id}
              count={cat.count}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {/*<section className="bg-[#fcf8d6] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured <span className="text-[#e8b924]">Products</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-[#e8b924] text-[#0e0e10] px-8 py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>*/}

      {/* Featured Products */}
      <section className="bg-[#fcf8d6] py-10 md:py-16">
        <div className="container mx-auto px-0 sm:px-4">
          
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-0 md:mb-12">
            Featured <span className="text-[#e8b924]">Products</span>
          </h2>

          {/* ✅ Responsive Product Grid */}
          {/*<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>*/}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 px-2 sm:px-4">
  {featuredProducts.map((product: any) => (
    <div key={product._id} className="p-1 sm:p-2">
      <ProductCard product={product} />
    </div>
  ))}
</div>

          <div className="text-center mt-10 md:mt-12">
            <Link
              href="/products"
              className="inline-block bg-[#e8b924] text-[#0e0e10] px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition"
            >
              View All Products
            </Link>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="text-[#e8b924]">Imani Imports</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#f6e9a6] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🌟</span>
            </div>
            <h3 className="font-semibold text-xl mb-2">Quality Products</h3>
            <p className="text-[#4d4d4d]">
              We source only the best products for your home and lifestyle.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-[#f6e9a6] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚚</span>
            </div>
            <h3 className="font-semibold text-xl mb-2">Nationwide Delivery</h3>
            <p className="text-[#4d4d4d]">
              We deliver to your doorstep anywhere in Kenya.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-[#f6e9a6] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="font-semibold text-xl mb-2">WhatsApp Support</h3>
            <p className="text-[#4d4d4d]">
              Quick and easy ordering via WhatsApp for your convenience.
            </p>
          </div>
        </div>
      </section>
    
    </div>
  );
}
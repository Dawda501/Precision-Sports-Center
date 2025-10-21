import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Grid, List, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductsAPI } from "@/lib/api.js";

const Shop = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const params = useMemo(
    () => ({
      q: searchTerm || undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      limit: 30,
    }),
    [searchTerm, priceRange]
  );

  useEffect(() => {
    let ignore = false;
    ProductsAPI.list(params)
      .then((res) => {
        if (ignore) return;
        setItems(res.items || []);
        setTotal(res.total || 0);
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, [params.q, params.minPrice, params.maxPrice]);

  const categories = [
    "Basketball",
    "Soccer",
    "Tennis",
    "Running",
    "Swimming",
    "Cycling",
    "Baseball",
    "Volleyball",
    "Gym & Fitness",
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Subtle glowing background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.1),transparent_40%)] pointer-events-none" />

      <div className="container relative py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Sports Equipment Store
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-gray-400 text-lg"
          >
            Find the perfect gear for your athletic journey.
          </motion.p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Filters */}
          <Card className="lg:col-span-1 backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Filter className="h-5 w-5 text-blue-400" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block text-gray-300">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-sm font-medium mb-3 block text-gray-300">
                  Categories
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center space-x-2 hover:bg-white/5 rounded-md px-2 py-1 transition"
                    >
                      <Checkbox id={category} />
                      <label htmlFor={category} className="text-sm text-gray-300">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div>
                <label className="text-sm font-medium mb-3 block text-gray-300">
                  Price Range: ${priceRange[0]} – ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Clear Button */}
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:opacity-90 transition text-white"
                onClick={() => {
                  setSearchTerm("");
                  setPriceRange([0, 500]);
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Top controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="text-sm text-gray-400">
                Showing {items.length} of {total} products
              </div>
              <div className="flex items-center gap-4">
                <Select defaultValue="popular">
                  <SelectTrigger className="w-48 bg-white/10 border-white/10 text-gray-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-gray-100 border-white/10">
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-white/10 rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                        : "text-gray-300 hover:text-white"
                    } rounded-none`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`${
                      viewMode === "list"
                        ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                        : "text-gray-300 hover:text-white"
                    } rounded-none`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`grid gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {items.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard
                      product={{
                        id: product.id,
                        name: product.name,
                        price: Number(product.price),
                        originalPrice: product.originalPrice
                          ? Number(product.originalPrice)
                          : undefined,
                        image:
                          (product.images && product.images[0]) ||
                          "/placeholder.png",
                        category: product.Category?.name,
                        rating: 4.5,
                        reviewCount: 0,
                        isOnSale: product.isOnSale,
                        inStock: product.stock > 0,
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

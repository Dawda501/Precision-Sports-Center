import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CartAPI } from "@/lib/api.js";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    CartAPI.get().then(setCart).catch(() => setCart({ CartItems: [] }));
  }, []);

  const items = cart?.CartItems || [];
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.unitPrice) * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!items.length) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.1),transparent_40%)]" />
        <ShoppingBag className="mx-auto h-24 w-24 text-gray-500 mb-6" />
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Your Cart is Empty
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Looks like you haven’t added any items yet.
        </p>
        <Link to="/shop">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:opacity-90">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* glowing ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.1),transparent_40%)] pointer-events-none" />

      <div className="container relative py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="mt-3 text-gray-400">
            Review your items and proceed to checkout.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center justify-between">
                  Cart Items <span className="text-sm text-gray-400">({items.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-white/10 last:border-b-0"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={
                            (item.Product?.images && item.Product.images[0]) ||
                            "/placeholder.png"
                          }
                          alt={item.Product?.name}
                          className="w-24 h-24 object-cover rounded-xl shadow-lg"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">
                            {item.Product?.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={async () => {
                              await CartAPI.remove(item.id);
                              const c = await CartAPI.get();
                              setCart(c);
                            }}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold text-emerald-400">
                            ${Number(item.unitPrice)}
                          </span>
                          {item.Product?.stock === 0 && (
                            <Badge variant="destructive">Out of Stock</Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-white/10 rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={async () => {
                                const q = Math.max(0, item.quantity - 1);
                                if (q === 0) {
                                  await CartAPI.remove(item.id);
                                } else {
                                  await CartAPI.update(item.id, q);
                                }
                                const c = await CartAPI.get();
                                setCart(c);
                              }}
                              className="h-9 w-9 hover:bg-white/10"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 min-w-[3rem] text-center text-gray-200">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={async () => {
                                const q = item.quantity + 1;
                                await CartAPI.update(item.id, q);
                                const c = await CartAPI.get();
                                setCart(c);
                              }}
                              className="h-9 w-9 hover:bg-white/10"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <span className="font-semibold text-gray-100">
                            ${(Number(item.unitPrice) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Link to="/shop">
                <Button
                  variant="outline"
                  className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24 backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-100">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Promo Code */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-300">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 hover:bg-white/10 text-gray-300 hover:text-white"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="flex justify-between text-lg font-bold text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:opacity-90 text-white text-base font-semibold py-6 rounded-xl">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                </Button>

                <div className="text-center mt-3">
                  <p className="text-sm text-gray-400">
                    Secure checkout with SSL encryption
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      </div>
  );
};

export default Cart;

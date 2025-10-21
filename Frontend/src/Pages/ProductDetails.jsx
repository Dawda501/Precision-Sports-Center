import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';
import { ProductsAPI, CartAPI } from '@/lib/api.js';
import { useAuth } from '@/context/AuthContext.jsx';
import Footer from '@/components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth() || {};
  const navigate = useNavigate();

  useEffect(() => {
    ProductsAPI.get(id).then(setProduct).catch(()=>{});
  }, [id]);

  if (!product) return <div className="container py-16">Loading...</div>;

  const price = Number(product.price);
  const originalPrice = product.originalPrice ? Number(product.originalPrice) : undefined;
  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const images = product.images && product.images.length ? product.images : ['/placeholder.png'];

  return (
    <div className="container py-8">
      <nav className="text-sm text-muted-foreground mb-8">
        <ol className="flex items-center space-x-2">
          <li><a href="/" className="hover:text-primary">Home</a></li>
          <li>/</li>
          <li><a href="/shop" className="hover:text-primary">Shop</a></li>
          <li>/</li>
          <li className="text-foreground">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="relative">
            <img src={images[selectedImage]} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
            {product.isOnSale && (
              <Badge variant="destructive" className="absolute top-4 left-4">-{discountPercentage}% OFF</Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button key={index} onClick={() => setSelectedImage(index)} className={`border-2 rounded-lg overflow-hidden ${selectedImage === index ? 'border-primary' : 'border-border'}`}>
                <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            {product.Category?.name && <Badge variant="outline" className="mb-2">{product.Category.name}</Badge>}
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-accent fill-accent' : 'text-muted-foreground'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.5 (0 reviews)</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">${price}</span>
              {originalPrice && originalPrice > price && (<span className="text-xl text-muted-foreground line-through">${originalPrice}</span>)}
            </div>
            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Quantity</label>
            <div className="flex items-center border border-border rounded-md w-fit">
              <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10"><Minus className="h-4 w-4" /></Button>
              <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
              <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.min(99, quantity + 1))} className="h-10 w-10"><Plus className="h-4 w-4" /></Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{product.stock} items in stock</p>
          </div>
          <div className="space-y-4">
            <Button size="lg" className="w-full" onClick={async()=>{
              if (!user) { navigate('/login'); return; }
              try { await CartAPI.add(product.id, quantity); } catch {}
            }}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart - ${(price * quantity).toFixed(2)}
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center"><Truck className="h-8 w-8 text-primary mx-auto mb-2" /><p className="text-sm font-medium">Free Shipping</p><p className="text-xs text-muted-foreground">Orders over $50</p></div>
            <div className="text-center"><RotateCcw className="h-8 w-8 text-primary mx-auto mb-2" /><p className="text-sm font-medium">Easy Returns</p><p className="text-xs text-muted-foreground">30-day policy</p></div>
            <div className="text-center"><Shield className="h-8 w-8 text-primary mx-auto mb-2" /><p className="text-sm font-medium">Warranty</p><p className="text-xs text-muted-foreground">1-year coverage</p></div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (0)</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card><CardContent className="pt-6"><p className="text-muted-foreground">{product.description}</p></CardContent></Card>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <Card><CardContent className="pt-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="flex justify-between py-2 border-b border-border"><span className="font-medium">Brand:</span><span className="text-muted-foreground">{product.brand || '—'}</span></div></div></CardContent></Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card><CardContent className="pt-6"><div className="text-center text-muted-foreground">No reviews yet.</div></CardContent></Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductDetails;
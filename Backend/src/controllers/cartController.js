import { Cart, CartItem, Product } from '../models/index.js';

export async function getCart(req, res) {
  const cart = await Cart.findOne({ where: { UserId: req.user.id }, include: [{ model: CartItem, include: [Product] }] });
  res.json(cart);
}

export async function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findByPk(productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (product.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });
  const cart = await Cart.findOne({ where: { UserId: req.user.id } });
  let item = await CartItem.findOne({ where: { CartId: cart.id, ProductId: product.id } });
  if (item) {
    const newQty = item.quantity + quantity;
    if (product.stock < newQty) return res.status(400).json({ error: 'Insufficient stock' });
    await item.update({ quantity: newQty, unitPrice: product.price });
  } else {
    item = await CartItem.create({ CartId: cart.id, ProductId: product.id, quantity, unitPrice: product.price });
  }
  const updated = await Cart.findByPk(cart.id, { include: [{ model: CartItem, include: [Product] }] });
  res.status(201).json(updated);
}

export async function updateCartItem(req, res) {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const item = await CartItem.findByPk(itemId, { include: [Product, Cart] });
  if (!item || item.Cart.UserId !== req.user.id) return res.status(404).json({ error: 'Item not found' });
  if (quantity <= 0) { await item.destroy(); return res.json({ success: true }); }
  if (item.Product.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });
  await item.update({ quantity });
  res.json(item);
}

export async function removeCartItem(req, res) {
  const { itemId } = req.params;
  const item = await CartItem.findByPk(itemId, { include: [Cart] });
  if (!item || item.Cart.UserId !== req.user.id) return res.status(404).json({ error: 'Item not found' });
  await item.destroy();
  res.json({ success: true });
}

export async function clearCart(req, res) {
  const cart = await Cart.findOne({ where: { UserId: req.user.id } });
  await CartItem.destroy({ where: { CartId: cart.id } });
  res.json({ success: true });
}

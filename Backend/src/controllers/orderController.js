import { sequelize } from '../config/db.js';
import { Cart, CartItem, Product, Order, OrderItem } from '../models/index.js';

export async function placeOrder(req, res) {
  const t = await sequelize.transaction();
  try {
    const cart = await Cart.findOne({ where: { UserId: req.user.id }, include: [{ model: CartItem, include: [Product] }], transaction: t, lock: t.LOCK.UPDATE });
    if (!cart || cart.CartItems.length === 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Cart is empty' });
    }
    let total = 0;
    for (const item of cart.CartItems) {
      if (item.Product.stock < item.quantity) {
        await t.rollback();
        return res.status(400).json({ error: `Insufficient stock for ${item.Product.name}` });
      }
      total += Number(item.unitPrice) * item.quantity;
    }
    const order = await Order.create({ UserId: req.user.id, status: 'pending', total }, { transaction: t });
    for (const item of cart.CartItems) {
      await OrderItem.create({ OrderId: order.id, ProductId: item.ProductId, quantity: item.quantity, unitPrice: item.unitPrice }, { transaction: t });
      await item.Product.update({ stock: item.Product.stock - item.quantity }, { transaction: t });
    }
    await CartItem.destroy({ where: { CartId: cart.id }, transaction: t });
    await t.commit();
    res.status(201).json(order);
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: 'Failed to place order' });
  }
}

export async function myOrders(req, res) {
  const orders = await Order.findAll({ where: { UserId: req.user.id }, order: [['createdAt', 'DESC']], include: [OrderItem] });
  res.json(orders);
}

export async function getOrder(req, res) {
  const order = await Order.findByPk(req.params.id, { include: [OrderItem] });
  if (!order || order.UserId !== req.user.id) return res.status(404).json({ error: 'Not found' });
  res.json(order);
}

export async function adminUpdateOrder(req, res) {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  const { status } = req.body;
  await order.update({ status });
  res.json(order);
}

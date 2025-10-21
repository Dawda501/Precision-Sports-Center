import { Op } from 'sequelize';
import { Product, Category } from '../models/index.js';

export async function listProducts(req, res) {
  const { q, category, minPrice, maxPrice, limit = 24, offset = 0 } = req.query;
  const where = {};
  if (q) where.name = { [Op.like]: `%${q}%` };
  if (minPrice) where.price = { ...(where.price || {}), [Op.gte]: Number(minPrice) };
  if (maxPrice) where.price = { ...(where.price || {}), [Op.lte]: Number(maxPrice) };
  const include = [{ model: Category, required: false }];
  if (category) include[0].where = { slug: category }, include[0].required = true;
  const products = await Product.findAndCountAll({ where, include, limit: Number(limit), offset: Number(offset), order: [['createdAt', 'DESC']] });
  res.json({ total: products.count, items: products.rows });
}

export async function getProduct(req, res) {
  const product = await Product.findByPk(req.params.id, { include: [Category] });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
}

export async function createProduct(req, res) {
  const { name, description, price, originalPrice, stock, images = [], brand, categoryId } = req.body;
  const product = await Product.create({ name, description, price, originalPrice, stock, images, brand, CategoryId: categoryId });
  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const { name, description, price, originalPrice, stock, images, brand, categoryId } = req.body;
  await product.update({ name, description, price, originalPrice, stock, images, brand, CategoryId: categoryId });
  res.json(product);
}

export async function deleteProduct(req, res) {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  await product.destroy();
  res.json({ success: true });
}

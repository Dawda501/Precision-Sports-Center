import { Category } from '../models/index.js';

export async function listCategories(req, res) {
  const categories = await Category.findAll({ order: [['name', 'ASC']] });
  res.json(categories);
}

export async function createCategory(req, res) {
  const { name, slug } = req.body;
  const exists = await Category.findOne({ where: { slug } });
  if (exists) return res.status(409).json({ error: 'Slug exists' });
  const category = await Category.create({ name, slug });
  res.status(201).json(category);
}

export async function updateCategory(req, res) {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ error: 'Not found' });
  const { name, slug } = req.body;
  await category.update({ name, slug });
  res.json(category);
}

export async function deleteCategory(req, res) {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ error: 'Not found' });
  await category.destroy();
  res.json({ success: true });
}

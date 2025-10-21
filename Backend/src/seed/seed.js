import bcrypt from 'bcryptjs';
import { sequelize } from '../config/db.js';
import { User, Category, Product, Cart } from '../models/index.js';

export default async function seed() {
  await sequelize.sync({ force: true });

  const adminPass = await bcrypt.hash('Admin@123', 10);
  const userPass = await bcrypt.hash('User@123', 10);

  const admin = await User.create({ email: 'admin@psc.com', passwordHash: adminPass, firstName: 'Admin', role: 'admin' });
  const user = await User.create({ email: 'user@psc.com', passwordHash: userPass, firstName: 'User', role: 'user' });

  await Cart.create({ UserId: admin.id });
  await Cart.create({ UserId: user.id });

  const categories = await Category.bulkCreate([
    { name: 'Basketball', slug: 'basketball' },
    { name: 'Soccer', slug: 'soccer' },
    { name: 'Tennis', slug: 'tennis' },
    { name: 'Running', slug: 'running' },
    { name: 'Swimming', slug: 'swimming' },
    { name: 'Cycling', slug: 'cycling' },
    { name: 'Baseball', slug: 'baseball' },
    { name: 'Volleyball', slug: 'volleyball' },
    { name: 'Gym & Fitness', slug: 'gym-fitness' },
  ]);

  const findCat = (slug) => categories.find((c) => c.slug === slug);

  await Product.bulkCreate([
    { name: 'Professional Basketball', description: 'Official size and weight', price: 49.99, originalPrice: 59.99, stock: 120, images: ['/imagesbasket.jpg'], brand: 'Spalding', CategoryId: findCat('basketball').id, isOnSale: true },
    { name: 'Soccer Cleats Pro', description: 'Firm ground studs', price: 89.99, stock: 80, images: ['/images.jpg'], brand: 'Nike', CategoryId: findCat('soccer').id },
    { name: 'Tennis Racket Elite', description: 'Carbon fiber frame', price: 129.99, originalPrice: 149.99, stock: 65, images: ['/placeholder.png'], brand: 'Wilson', CategoryId: findCat('tennis').id, isOnSale: true },
    { name: 'Running Shoes Advanced', description: 'Breathable and lightweight', price: 119.99, stock: 200, images: ['/placeholder.png'], brand: 'Adidas', CategoryId: findCat('running').id },
    { name: 'Swimming Goggles Pro', description: 'Anti-fog lenses', price: 24.99, stock: 150, images: ['/placeholder.png'], brand: 'Speedo', CategoryId: findCat('swimming').id },
  ]);
}

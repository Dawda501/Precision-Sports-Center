import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Cart from './Cart.js';
import CartItem from './CartItem.js';
import Address from './Address.js';
import RefreshToken from './RefreshToken.js';

// Associations
Category.hasMany(Product, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Product.belongsTo(Category);

User.hasOne(Cart, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Cart.belongsTo(User);

Cart.hasMany(CartItem, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
CartItem.belongsTo(Cart);

Product.hasMany(CartItem, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
CartItem.belongsTo(Product);

User.hasMany(Order, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Order.belongsTo(User);

Order.hasMany(OrderItem, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
OrderItem.belongsTo(Product);

User.hasMany(Address, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Address.belongsTo(User);

User.hasMany(RefreshToken, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
RefreshToken.belongsTo(User);

export {
  User,
  Category,
  Product,
  Order,
  OrderItem,
  Cart,
  CartItem,
  Address,
  RefreshToken,
};

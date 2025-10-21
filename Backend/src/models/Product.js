import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.TEXT, // JSON string array
      allowNull: true,
      get() {
        const raw = this.getDataValue('images');
        try { return raw ? JSON.parse(raw) : []; } catch { return []; }
      },
      set(val) {
        this.setDataValue('images', JSON.stringify(val || []));
      }
    },
    brand: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    isOnSale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
  }
);

export default Product;

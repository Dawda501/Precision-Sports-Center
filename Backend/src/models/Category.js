import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(140),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    indexes: [{ unique: true, fields: ['slug'] }],
  }
);

export default Category;

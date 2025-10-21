import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

class Address extends Model {}

Address.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('shipping', 'billing'),
      allowNull: false,
      defaultValue: 'shipping',
    },
    line1: { type: DataTypes.STRING(255), allowNull: false },
    line2: { type: DataTypes.STRING(255), allowNull: true },
    city: { type: DataTypes.STRING(120), allowNull: false },
    state: { type: DataTypes.STRING(120), allowNull: true },
    postalCode: { type: DataTypes.STRING(40), allowNull: false },
    country: { type: DataTypes.STRING(120), allowNull: false },
  },
  {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses',
    timestamps: true,
  }
);

export default Address;

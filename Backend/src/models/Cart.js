import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: true,
  }
);

export default Cart;

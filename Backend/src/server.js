import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import './models/index.js';
import app from './app.js';
import seed from './seed/seed.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    if (process.env.SEED === 'true') {
      await seed();
    }
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();

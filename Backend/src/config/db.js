import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const dialect = (process.env.DB_DIALECT || 'sqlite').toLowerCase();

let sequelize;
if (dialect === 'sqlite') {
  const storage = process.env.SQLITE_PATH
    ? path.resolve(process.cwd(), process.env.SQLITE_PATH)
    : path.resolve(DATA_DIR, 'database.sqlite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage,
    logging: false,
  });
} else {
  // Support postgres/mysql/mariadb via DATABASE_URL or discrete vars
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    sequelize = new Sequelize(databaseUrl, {
      dialect,
      logging: false,
    });
  } else {
    const dbName = process.env.DB_NAME;
    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASS || '';
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined;
    sequelize = new Sequelize(dbName, dbUser, dbPass, {
      host: dbHost,
      port: dbPort,
      dialect,
      logging: false,
    });
  }
}

export { sequelize };

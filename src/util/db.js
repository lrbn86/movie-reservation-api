import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.HOST,
  database: process.env.DB_NAME
});

const info = pool.options;

async function insert(tableName, data, returning = ['*']) {
  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = values.map((_, i) => `$${i + 1}`);

  const sql = `
    INSERT INTO ${tableName} (${columns.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING ${returning.join(', ')}
  `;

  const result = await pool.query(sql, values);
  return result.rows[0];
}

async function findByEmail(tableName, data) {
  const sql = `
    SELECT * FROM ${tableName} WHERE email=$1
  `;
  const result = await pool.query(sql, [data.email]);
  return result.rows[0];
}

async function createUserTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;
  await pool.query(sql);
}

async function testConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('[SUCCESS] Database connected');
    console.log(`\tconnected to database '${info.database}' on host '${info.host}'`);
    return true;
  } catch (err) {
    console.error('[FAILED] Database connection failed');
    console.error(`\t${err.message}`);
    return false;
  }
}

export default {
  insert,
  findByEmail,
  createUserTable,
  testConnection,
};

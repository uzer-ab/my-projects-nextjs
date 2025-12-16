import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;

// export async function testDbConnection() {
//   try {
//     const result = await pool.query("SELECT * FROM test");
//     console.log("Rows:", result.rows);
//     console.log("✅ PostgreSQL connection OK");
//   } catch (err) {
//     console.error("❌ PostgreSQL connection failed:", err);
//   }
// }

import { pool } from "./config/db";

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("DB Connected:", result.rows[0]);
  } catch (error) {
    console.error("DB Connection Failed:", error);
  }
}

testDB();
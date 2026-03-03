import app from './app';
import { pool } from './config/db';

const PORT = Number(process.env.PORT) || 5000;

pool
  .connect()
  .then(() => {
    console.log('✅ PostgreSQL connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err: Error) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });
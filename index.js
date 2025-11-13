import app from './app.js';
import db from './src/util/db.js';

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server started on http://localhost:${port}`);
  const connected = await db.testConnection();
  if (connected) {
    await db.createUserTable();
  }
});

const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  db()
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const ordersRouter = require('./routes/orders');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


// use routes
app.use('/api', ordersRouter);

// start server
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app };
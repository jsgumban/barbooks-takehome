const Database = require('./database');
require('dotenv').config();

async function seedDatabase() {
  const db = new Database(process.env.DB_PATH || './data.db');
  
  try {
    await db.connect();
    await db.initialize();

    // Sample orders for testing
    const sampleOrders = [
      { product: 'Laptop', qty: 2, price: 1200.00 },
      { product: 'Wireless Mouse', qty: 5, price: 45.99 },
      { product: 'Mechanical Keyboard', qty: 3, price: 89.50 },
      { product: 'Monitor', qty: 1, price: 299.99 },
      { product: 'Laptop', qty: 1, price: 1200.00 },
      { product: 'USB Cable', qty: 10, price: 12.99 },
      { product: 'Wireless Mouse', qty: 2, price: 45.99 },
      { product: 'Desk Pad', qty: 4, price: 24.95 }
    ];

    // Clear existing data
    await new Promise((resolve, reject) => {
      db.db.run('DELETE FROM orders', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Insert sample orders
    const insertSQL = 'INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)';
    
    for (const order of sampleOrders) {
      await new Promise((resolve, reject) => {
        db.db.run(insertSQL, [order.product, order.qty, order.price], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    console.log(`Successfully seeded database with ${sampleOrders.length} orders`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await db.close();
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
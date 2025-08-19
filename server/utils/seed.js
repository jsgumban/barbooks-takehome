const db = require('../config/database');

async function seedDatabase() {
  try {
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

    // Create table if it doesn't exist
    await db.schema.createTable('orders', (table) => {
      table.increments('id').primary();
      table.string('product').notNullable();
      table.integer('qty').notNullable();
      table.decimal('price', 10, 2).notNullable();
    }).then(() => {
      console.log('Orders table created/verified');
    }).catch((err) => {
      if (!err.message.includes('already exists')) {
        throw err;
      }
    });

    // Clear existing data and insert new
    await db('orders').del();
    await db('orders').insert(sampleOrders);

    console.log(`Successfully seeded database with ${sampleOrders.length} orders`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await db.destroy();
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
const request = require('supertest');
const { app } = require('../index');
const knex = require('knex');

describe('Orders API Integration Tests', () => {
  let db;
  let testApp;

  beforeAll(async () => {
    // Set up in-memory SQLite database for testing
    db = knex({
      client: 'sqlite3',
      connection: ':memory:',
      useNullAsDefault: true,
      migrations: {
        directory: './migrations'
      }
    });

    // create the orders table
    await db.schema.createTable('orders', (table) => {
      table.increments('id').primary();
      table.text('product').notNullable();
      table.integer('qty').notNullable();
      table.real('price').notNullable();
    });

    // replace the database connection in the config with our test database
    const databaseConfig = require('../config/database');
    Object.setPrototypeOf(databaseConfig, db);
    Object.assign(databaseConfig, db);

    testApp = app;
  });

  afterAll(async () => {
    if (db) {
      await db.destroy();
    }
  });

  beforeEach(async () => {
    // Clean the database before each test
    await db('orders').del();
  });

  describe('POST /api/orders', () => {
    it('should create a new order and return it correctly', async () => {
      const newOrder = {
        product: 'Test Widget',
        qty: 5,
        price: 19.99
      };

      const response = await request(testApp)
        .post('/api/orders')
        .send(newOrder)
        .expect(201);

      // Verify the response structure
      expect(response.body).toHaveProperty('id');
      expect(response.body.product).toBe(newOrder.product);
      expect(response.body.qty).toBe(newOrder.qty);
      expect(response.body.price).toBe(newOrder.price);
      expect(typeof response.body.id).toBe('number');

      // Verify the order was actually inserted in the database
      const ordersInDb = await db('orders').select('*');
      expect(ordersInDb).toHaveLength(1);
      expect(ordersInDb[0].product).toBe(newOrder.product);
      expect(ordersInDb[0].qty).toBe(newOrder.qty);
      expect(ordersInDb[0].price).toBe(newOrder.price);
    });

    it('should return 400 for invalid order data', async () => {
      const invalidOrder = {
        product: '',
        qty: -1,
        price: 'invalid'
      };

      const response = await request(testApp)
        .post('/api/orders')
        .send(invalidOrder)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      
      // verify no order was inserted
      const ordersInDb = await db('orders').select('*');
      expect(ordersInDb).toHaveLength(0);
    });

    it('should handle missing required fields', async () => {
      const incompleteOrder = {
        product: 'Test Product'
        // missing qty and price
      };

      const response = await request(testApp)
        .post('/api/orders')
        .send(incompleteOrder)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      
      // verify no order was inserted
      const ordersInDb = await db('orders').select('*');
      expect(ordersInDb).toHaveLength(0);
    });
  });
});
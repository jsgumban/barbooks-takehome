# BarBooks Take-Home Test

A full-stack JavaScript application for managing orders with real-time analytics.

## Tech Stack

- **Backend**: Node.js + Express + SQLite + Knex ORM
- **Frontend**: React with Bootstrap
- **Testing**: Jest + Supertest

## Quick Start

```bash
# Install dependencies
npm install

# Start both client and server
npm run dev

# Run tests
npm test
```

## API Endpoints

- `GET /api/summary` - Order analytics summary
- `GET /api/orders` - List orders (supports filtering & pagination)
- `POST /api/orders` - Create new order

## Features

- **Order Management**: Add, view, and filter orders
- **Analytics Dashboard**: Revenue, median price, top products
- **Search & Pagination**: Filter by product name with paginated results
- **Real-time Updates**: UI refreshes after adding orders
- **Responsive Design**: Mobile-friendly Bootstrap interface

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
│   ├── config/      # Database configuration
│   ├── routes/      # API routes
│   ├── src/         # Business logic
│   └── tests/       # Unit & integration tests
└── package.json     # Workspace configuration
```

## Environment Variables

Create `.env` in root:
```
DB_PATH=./server/data.db
PORT=3001
REACT_APP_API_URL=http://localhost:3001
```

## Scripts

- `npm run dev` - Start development servers
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm test` - Run all tests
- `npm run build` - Build frontend for production
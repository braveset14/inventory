require('dotenv').config();
const pool = require('./pool');

const seedData = [
  {
    name: 'Pantry',
    items: [
      { name: 'Rice', type: 'Grain', price: 4.99, amount: 24, expiry_date: '2027-04-15' },
      { name: 'Olive oil', type: 'Cooking oil', price: 8.5, amount: 12, expiry_date: '2027-01-20' },
      { name: 'Canned tomatoes', type: 'Canned food', price: 2.25, amount: 36, expiry_date: '2028-06-01' }
    ]
  },
  {
    name: 'Cleaning supplies',
    items: [
      { name: 'Dish soap', type: 'Cleaning', price: 3.75, amount: 18, expiry_date: null },
      { name: 'Paper towels', type: 'Paper goods', price: 6.99, amount: 10, expiry_date: null }
    ]
  },
  {
    name: 'Office supplies',
    items: [
      { name: 'Notebook', type: 'Stationery', price: 3.25, amount: 30, expiry_date: null },
      { name: 'Blue pens', type: 'Stationery', price: 1.5, amount: 50, expiry_date: null }
    ]
  }
];

async function seed() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const categoryData of seedData) {
      const categoryResult = await client.query(
        'SELECT id FROM categories WHERE name = $1 LIMIT 1',
        [categoryData.name]
      );

      let categoryId = categoryResult.rows[0]?.id;

      if (!categoryId) {
        const result = await client.query(
          'INSERT INTO categories (name) VALUES ($1) RETURNING id',
          [categoryData.name]
        );
        categoryId = result.rows[0].id;
      }

      for (const item of categoryData.items) {
        const existingItem = await client.query(
          'SELECT id FROM items WHERE category_id = $1 AND name = $2 LIMIT 1',
          [categoryId, item.name]
        );

        if (existingItem.rowCount === 0) {
          await client.query(
            `INSERT INTO items
              (name, category_id, type, price, amount, expiry_date)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [item.name, categoryId, item.type, item.price, item.amount, item.expiry_date]
          );
        }
      }
    }

    await client.query('COMMIT');
    console.log('Dummy inventory data added successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();

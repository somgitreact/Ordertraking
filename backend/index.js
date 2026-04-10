const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
  const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const STATUS_FLOW = {
  PLACED: 'PACKED',
  PACKED: 'SHIPPED',
  SHIPPED: 'DELIVERED',
  DELIVERED: null
};


app.post('/orders', async (req, res) => {
  const { product_name } = req.body;
  const [result] = await db.query(
    'INSERT INTO orders (product_name) VALUES (?)',
    [product_name]
  );
  res.json({ id: result.insertId, status: 'PLACED' });
});


app.get('/orders', async (req, res) => {
  const [orders] = await db.query('SELECT * FROM orders');
  res.json(orders);
});


app.put('/orders/:id/status', async (req, res) => {
  const { id } = req.params;

  const [[order]] = await db.query(
    'SELECT * FROM orders WHERE id = ?',
    [id]
  );

  if (!order) return res.status(404).json({ error: 'Not found' });

  const next = STATUS_FLOW[order.status];
  if (!next) return res.status(400).json({ error: 'Already delivered' });

  await db.query(
    'UPDATE orders SET status = ? WHERE id = ?',
    [next, id]
  );

  res.json({ id, status: next });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
import express from 'express';
import dbConnect from './db.js';
import mongodb from 'mongodb';
import cors from 'cors'

const app = express()

app.use(cors())

const PORT = process.env.PORT || 5000;

app.use(express.json())


app.get('/products', async (req, res) => {
  try {
    let data = await dbConnect();
    data = await data.find().toArray();
    res.send({"message" : "Product fetch Successfully" , "data" :data});
  } catch (err) {
    console.error('Error fetching Products:', err);
    res.status(500).json({ error: 'Failed to fetch proucts' });
  }
});


app.post('/product', async (req, res) => {
  try {
    let data = await dbConnect();
    let result = await data.insertOne(req.body)
    res.send({ result: "product created" })
  } catch (err) {
    console.error('Error adding products:', err);
    res.status(500).json({ error: 'Failed to add products' });
  }
});


// Update a product by name
app.put('/product/:id', async (req, res) => {
  try {
    let data = await dbConnect();
    data = await data.updateOne(
      { _id:  new mongodb.ObjectId(req.params.id) },
      { $set: req.body }
    )
    res.send({ message: "product update" })
  } catch (err) {
    console.error('Error updating product', err);
    res.status(500).json({ error: 'Failed to update products' });
  }
});


app.delete('/product/:id', async (req, res) => {
  try {
    let data = await dbConnect();
    let result = await data.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
    res.send(result);
  } catch (err) {
    console.error('Error deleting products:', err);
    res.status(500).json({ error: 'Failed to delete products' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});















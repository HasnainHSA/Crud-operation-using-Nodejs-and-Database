const express = require('express');
const dbConnect = require('./db');
const mongodb = require('mongodb')

const app = express()


const PORT = process.env.PORT || 5000;

app.use(express.json())

app.get('/', async (req, res) => {
  try {
    let data = await dbConnect();
    data = await data.find().toArray();
    res.send(data);
  } catch (err) {
    console.error('Error fetching Products:', err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

//get('/', async (req,res)=>{
//   let data = await dbConnect();
//   data = await data.find().toArray();
//   console.log(data)
//   res.send(data)
// })


app.post('/', async (req, res) => {
  try {
    let data = await dbConnect();
    data = await data.updateOne(
      { name: req.params.name },
      { $set: req.body }
    )
    res.send({ result: "update" })
  } catch (err) {
    console.error('Error adding products:', err);
    res.status(500).json({ error: 'Failed to add products' });
  }
});


// Update a product by name
put('/:name', async (req, res) => {
  try {
    let data = await dbConnect();
    data = await data.updateOne(
      { name: req.params.name },
      { $set: req.body }
    )
    res.send({ message: "product update" })
  } catch (err) {
    console.error('Error updating product', err);
    res.status(500).json({ error: 'Failed to update products' });
  }
});


app.delete('/:id', async (req, res) => {
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















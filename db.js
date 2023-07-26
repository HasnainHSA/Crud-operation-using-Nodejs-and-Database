import {MongoClient} from 'mongodb';
const url = 'mongodb+srv://coder:coder123@cluster0.n6m0q1g.mongodb.net/?retryWrites=true&w=majority'
const databasename = 'e-comm'
const client =  new MongoClient(url)

const dbConnect =  async ()=>{
    let result = await client.connect();
    let db = result.db(databasename);
    return db.collection('products')
}

export default dbConnect;
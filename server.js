import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const app = express();
app.use(express.json());

const PORT = process.env.SECRET_EXAMPLE_PORT || 3000;
const KEY = process.env.SECRET_EXAMPLE_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DATABASE_NAME;

const ConnectToDB = async () => {
  await client.connect();
}
const client = new MongoClient(MONGODB_URI);
await ConnectToDB();
const db = client.db(DB_NAME);

// ================ ENDPOINTS ================
app.get("/", async (req, res) => {
  try {
    const docs = await db.collection("exampleCollection").find().toArray();
    res.send(docs);
  } catch(error) {
    console.error(error);
    res.status(500)
  }
})

app.post("/createDoc", async (req, res) => {
  const content = req.body;
  console.log(content);
  try {
    const result = await db.collection("exampleCollection").insertOne(content);
    console.log(result);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500)
  }
})

app.listen(PORT, () => {
  console.log(`Server läuft auf Port: ${PORT}`);
})
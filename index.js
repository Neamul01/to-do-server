const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const res = require('express/lib/response');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server is running...!!!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rcf71.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const listCollection = client.db('to-do').collection('list');

        app.get('/list', async (req, res) => {
            const query = {};
            const result = await listCollection.find(query).toArray();
            res.send(result);
        });
        app.post('/list', async (req, res) => {
            const data = req.body;
            const result = await listCollection.insertOne(data);
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.dir)

app.listen(port, () => {
    console.log('app running at port: ', port)
})
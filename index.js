const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.DB_PASS}@cluster0.pxpswgp.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const servicecollection = client.db('hostelmate').collection('services');
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = servicecollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

    }
    finally {

    }

}
run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send("server is running")
})
app.listen(port, () => {
    console.log(`Hostel mate is running ${port}`);
})

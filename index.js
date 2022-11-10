const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.DB_PASS}@cluster0.pxpswgp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const servicecollection = client.db('hostelmate').collection('services');
        const reviewcollection = client.db('hostelreviews').collection('reviews')
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = servicecollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicecollection.findOne(query);
            res.send(service);

        })
        app.get('/reviews', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewcollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewcollection.insertOne(review);
            res.send(result);
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

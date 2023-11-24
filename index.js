const express = require("express")
const app = express()
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173",
    ],
    credentials: true
}))

const uri = process.env.DB_SECRET;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {


    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const districtsCollection = client.db('BloodDB').collection('districts')
        const upuzilaCollection = client.db('BloodDB').collection('Upazilas')
        const usersCollection = client.db('BloodDB').collection('users')






        //get districts data

        app.get('/districts', async (req, res) => {

            const result = await districtsCollection.find().toArray()
            res.send(result)
        })

        //get upuzilaa data

        app.get('/upuzila/:id', async (req, res) => {
            const id = req.params.id;
            const qeury = { district_id: id }
            const result = await upuzilaCollection.find(qeury).toArray()
            res.send(result)
        })

        //users data post

        app.post('/user', async (req, res) => {
            const user = req.body

            const qeury = { email: user.email }
            const existingUser = await usersCollection.findOne(qeury)
            if (existingUser) {
                return res.send({ message: "User already exits", insertedId: null })
            }
            const result = await usersCollection.insertOne(user)

            res.send(result)

        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Blood Donation Server is Running");
})


app.listen(port, (req, res) => {
    console.log(`Blood Donation Server running on this port: ${port}`);
})
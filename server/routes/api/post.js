const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

//Add

router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    }); 
    res.status(201).send()
})

//Delete

router.delete('/:id', async (req, res) => {
    const posts= await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send({});
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://abc123:security@cluster0.qnxni.mongodb.net/Test-app-traversy?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true
    });

    return client.db('Test-app-traversy').collection('posts');
}

module.exports = router
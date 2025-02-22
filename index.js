const express = require('express');
const app = express();
const redisClient = require('./redisClient');
const PORT = 9090;

app.get('/ping', (req, res) => {
    res.send('PONG');
})


const redisCache = async (req, res, next) => {
    try {
        const data = await redisClient.get('products');
        if (data) {
            console.log('Cache Hit');
            res.status(200).json(data);
        } else {
            console.log('Cache Miss');
            next();
        }
    } catch (err) {
        throw err;
    }
}
app.get('/products', redisCache, async (req, res) => {
    try {
        //third party API
        const api = 'https://fakestoreapi.com/products';
        const result = await fetch(api);
        const data = await result.json();
        await redisClient.set('products', JSON.stringify(data), { PX: 10000 }); // TTL - 5sec
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'something went wrong, please try again' })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
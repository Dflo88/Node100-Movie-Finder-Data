require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const instance = axios.create();

const app = express();

app.use(morgan('dev'));

app.get('/favicon', (req,res) => {
    console.log('stupid favicon')
})

app.get('/', (req,res) => {
    let queryParam = (Object.keys(req.query)[0])
    instance.get(`http://omdbapi.com/?${queryParam}=${req.query[queryParam]}&apikey=${process.env.OMDB_API_KEY}`)
            .then(response => res.send(response.data))
            .catch(err => console.log(err));
})

app.get(`/:id`, (req, res) => {
    console.log(`http://omdbapi.com/?=${req.params.id}&apikey=${process.env.OMDB_API_KEY}`)
    axios.get(`http://omdbapi.com/?s=${req.params.id}&apikey=${process.env.OMDB_API_KEY}`)
        .then(response => res.send(response.data))
        .catch(err => res.send(err));
})


// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./src/routes/posts');
const app = express();

mongoose.connect('mongodb://localhost/mean_db',{useNewUrlParser:true});

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, Content-Type, Accept, X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH ,PUT, DELETE, OPTIONS');
    next();
});
app.use('/uploads', express.static(path.join('uploads')));
app.use(bodyParser.json());
app.use('/api/posts',router);
module.exports = app;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri =process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('mongoDB connnected successfully');
});

const exerciseRoute = require('./routes/exercise');
const userRoute = require('./routes/users');

app.use('/exercise',exerciseRoute);
app.use('/users',userRoute);

app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
});

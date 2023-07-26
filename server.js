const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const connectDb = require('./config/dbconnection');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use('/', require('./routes/contactRoute'));
app.get("/", (req, res) => {
    res.send("Test it on Postman :)");
});

connectDb();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

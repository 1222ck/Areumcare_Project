const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//mongoDB 연결-------------------------------------------------
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
    );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
});
//-------------------------------------------------------------

//router 연결---------------------------------------------------
const prescriptionRouter = require('./routes/prescription');
const usersRouter = require('./routes/users');
const hospitalRouter = require('./routes/login');

app.use('/prescription', prescriptionRouter);
app.use('/users', usersRouter);
app.use('/hospital', hospitalRouter);
//-------------------------------------------------------------

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
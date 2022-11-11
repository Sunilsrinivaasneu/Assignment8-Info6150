//setting up dependencies______________________________________________

const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const mongoose = require('mongoose');


//connect to mongoose using mongo____________________________________________

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// connecting to API________________________________________

const user_api = require('./api/api_user');
app.use('/user',user_api);

//running the server_______________________________________________________

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


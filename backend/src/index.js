const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

require('dotenv').config();

const UserRoute =  require('./Routes/User');
const AdminRoute = require('./Routes/Admin');

app.use(cors());
app.use(bodyParser.json())
app.use('/',UserRoute);
app.use('/admin',AdminRoute);

require('../db/config');

const PORT = '4000';

app.use(express.json());
app.use('/uploads',express.static('uploads'));

app.listen(PORT,() => console.log('Server started on port: ',PORT));
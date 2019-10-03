const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const contactRoute = require('./contact/contact.route');

// mongoose.connect('mongodb+srv://nabwab1234:nabwab1234@cluster0-y5ncp.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connect('mongodb://localhost:27017/contact');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/health-test', (req, res)=>{
  res.send('Yes this is checked.');
});
app.use('/api/contact', contactRoute);

app.listen(3030, function(){
    console.log('Server is up on port 3030');
});
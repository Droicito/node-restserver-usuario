const express = require('express');
const app = express();
const port = 3000;
let dBName="";

dBName="Coffee";
// getting-started.js
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/${dBName}`,{ useNewUrlParser: true },

    (err,res)=>{

        if(err) throw err;
        console.log(`Database : ${dBName} is conected`);
           
    });




var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

app.use(require('../routes/user2'));

app.listen(port,()=>{

    console.log(`Escuchando en el puerto : ${port}`);
});
///server 7 como server final
const express = require('express');
const app = express();

require('./config/config');

// getting-started.js
const mongoose = require('mongoose');
console.log(process.env.MONGOURI);

mongoose.connect(process.env.MONGOURI,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify: false},

    (err,res)=>{

        if(err) throw err;
        console.log(`Database is conected in ${process.env.MONGOURI}`);
           
    });




var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

app.use(require('../routes/user'));

app.listen(process.env.PORT,()=>{

    console.log(`Escuchando en el puerto : ${process.env.PORT}`);
});
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

app.post('/user',function(req,res){

    let body=req.body;

    if(body.name === undefined){

        res.status(400).json({

            ok:false,
            message:'Entry Name of User that is Necesary'
        })
    }else {

        res.json({

            person:body,
        })
    }
   
});

// app.post('/user',function(req,res){

//     res.json(req.body);
//     // res.json('Post User');
    
// })

app.put('/user/:id',function(req,res){

    let id=req.params.id;
    res.json({
        
        usrid:id
    });
})

app.get('/', function (req, res) {
//   res.send('Hello World');
     res.json('Hello World !!');
})
 
app.listen(port,()=>{

    console.log(`Escuchando en el puerto : ${port}`);
});
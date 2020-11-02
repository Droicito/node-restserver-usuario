
const express = require('express');
const app = express();


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

app.put('/user/:id',function(req,res){

    let id=req.params.id;
    res.json({
        
        usrid:id
    });
});

app.get('/', function (req, res) {
//   res.send('Hello World');
     res.json('Hello World !!');
});
 
module.exports=app;
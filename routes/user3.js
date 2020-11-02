
const express = require('express');
const app = express();

const User=require('../models/user3');

const bcrypt = require('bcrypt');

// NEW Post Crea Usuario
app.post('/user',function(req,res){

    let body=req.body;

    let user=new User({

        name:body.name,
        email:body.email,
        passw:bcrypt.hashSync(body.passw,10),
        // passw:body.passw,
        role:body.role
    });

    user.save((err,userDB)=>{

        if(err){
    
            return res.status(400).json({
                ok:false,
                err:err,
            });
        };

        // userDB.passw=null,
        res.json({

            ok:true,
            user_save:userDB,
        });
    });    

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
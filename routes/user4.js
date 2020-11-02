
const express = require('express');
const app = express();

const User=require('../models/user3');

const bcrypt = require('bcrypt');

const underscore=require('underscore');
const { pick } = require('underscore');

// New Put and Delete CAMBIO de Estado: false

app.put('/user/:id',function(req,res){

    let id=req.params.id;
    // let body=req.body;
    
    //desactiva google y password:

    let body=underscore.pick(req.body,['name','email','img','role','estado']);

    

    User.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,userUpd)=>{

        console.log(id);
        console.log(body);

        if(err){
    
            return res.status(400).json({
                ok:false,
                err:err,
            });
        };

        res.json({
        
                ok:true,
                user_Update:userUpd,
        });

    });
    
});


app.delete('/user/:id',function(req,res){


    let id=req.params.id;

    let cambioEstado={
        

        estado:false,
    }

    User.findByIdAndUpdate(id,cambioEstado,{new:true},(err,userDelete)=>{

        // Error si id ingresado no es exacto o correcto , etc
        if(err){
    
            return res.status(400).json({
                ok:false,
                err:err,
            });
        };
        // Error viene de routes user5 :

        //Mensaje de Error al intentar eliminar usuario x 2da Vez

        if(userDelete.estado===false){

            return res.status(400).json({
                ok:false,
                err:{

                    mensaje:'Usuario ya esta en estado de baja ',
                }
            });
        }

        res.json({

            ok:true,
            user_Delete:userDelete,
        });
            

    });
});


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


app.get('/', function (req, res) {
//   res.send('Hello World');
     res.json('Hello World !!');
});
 
module.exports=app;
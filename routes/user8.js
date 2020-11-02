
const express = require('express');
const app = express();

const User=require('../models/user3');

const bcrypt = require('bcrypt');

const underscore=require('underscore');
const { pick } = require('underscore');




//New Get Buscar Uno

app.get('/user', function (req, res) {

    let id=req.query.id;

    User.findById(id,(err,user)=>{

        if(err){
    
            return res.status(400).json({
                ok:false,
                err:err,
            });
        };

        res.json({

            ok:true,
            userbyid:user,
        });

    })

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


app.put('/user/:id',function(req,res){

    let id=req.params.id;
    // let body=req.body;
    
    //desactiva google y password:

    let body=underscore.pick(req.body,['name','email','img','role','estado','google']);

    

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

    let body=req.body;
    
    
    User.findByIdAndDelete(id,(err,userDelete)=>{

        // Error si id ingresado no es exacto o correcto , etc
        if(err){
    
            return res.status(400).json({
                ok:false,
                err:err,
            });
        };

        //Mensaje de Error al intentar eliminar usuario x 2da Vez

        if(userDelete===null){

            return res.status(400).json({
                ok:false,
                err:{

                    mensaje:'Usuario ya eliminado',
                }
        });

        //Elimina Usuario por Primera vez
    }
        res.json({

            ok:true,
            user_DeleteDB:userDelete,
        });
            

    });
});


module.exports=app;
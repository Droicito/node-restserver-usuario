// user7 como route final

const express = require('express');
const app = express();

const User=require('../models/user3');

const bcrypt = require('bcrypt');

const underscore=require('underscore');
const { pick } = require('underscore');


//Get One User

app.get('/user_id', function (req, res) {

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

//New Get Cuantos registros hay

app.get('/user', function (req, res) {

let desde=req.query.desde || 0;

desde=Number(desde);

let limite=req.query.limite || 3;

limite=Number(limite);

    User.find({estado:true,google:false},'name email role estado')
         .skip(desde)
         .limit(limite)
         .exec((err,users)=>{

            if(err){
    
                return res.status(400).json({
                    ok:false,
                    err:err,
                });
            };
            
            User.countDocuments({estado:true,google:false},(err,contar)=>{

                if(err){
    
                    return res.status(400).json({
                        ok:false,
                        err:err,
                    });
                };

                res.json({
    
                    ok:true,
                    all_users:users,
                    cuantos:contar,

                });

            });
            
         });

});

/// Crea Usuario Nuevo
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

// Actualiza Usuario 
app.put('/user/:id',function(req,res){

    let id=req.params.id;
    // let body=req.body;
    
    //desactiva google y password:

    let body=underscore.pick(req.body,['name','email','img','role','estado','google']);

    

    User.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,userUpd)=>{


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

// Delete Elimina Registro de Base de Datos

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

// Cambia a Estado de baja a Usuario
app.delete('/useroff/:id',function(req,res){


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

module.exports=app;
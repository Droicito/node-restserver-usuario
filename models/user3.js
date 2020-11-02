const mongoose = require("mongoose");

var uniqueValidator = require('mongoose-unique-validator');


let rolesValidos={

    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol valido',

}

let Schema=mongoose.Schema;

let userSchema = new Schema({

    name:{
        type:String,
        required:[true,'El nombre es Obligatorio'],

    } ,// str , oblig
    email:{
        type:String,
        unique:true,
        required:[true,'Introduzca correo electronico es necesario']
    } ,// str , oblig
    passw:{
        type:String,
        required:[true,'Ingrese una contrasena obligatoria']
    } ,// str , oblig  
    img:{
        type:String,
        
    } ,// str , opcional  
    role:{
        type:String,
        default:'USER_ROLE',
        enum:rolesValidos,
    },//default:'USER_ROLE'
    estado:{
        type:Boolean,
        default:true,
    },//Boolean
    google:{
        type:Boolean,
        default:false
    },//Boolean

});

//Delete password to response Frontend

userSchema.methods.toJSON=function(){

    let user=this;
    let userObject=user.toObject();
    delete userObject.passw;

    return userObject;
}

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator,{message:'{PATH} debe ser unico.'});

module.exports=mongoose.model('Usuario',userSchema);    
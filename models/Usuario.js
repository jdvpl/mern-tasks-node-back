const mongoose=require('mongoose');

const usuariosSchema=mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    username:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    
    },
    registro:{
        type:Date,
        default:Date.now()
    },
    linkFacebook:{
        type:String,
        trim:true

    },
    linkGithub:{
        type:String,
        trim:true
    },
    telefono:{
        type:String,
        trim:true

    },
    sitioWeb:{
        type:String,
        trim:true
    },
    foto:{
        type:String,
        trim:true
    }


});

module.exports=mongoose.model('Usuario',usuariosSchema);
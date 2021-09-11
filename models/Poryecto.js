const mongoose = require("mongoose");

const ProyectoSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    creador:{
        type:mongoose.Schema.Types.ObjectId, //se le pasa el ide de la base de datos
        ref:'Usuario', 
    },
    creado:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('Proyecto',ProyectoSchema);
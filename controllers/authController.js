const Usuario=require('../models/Usuario');
const bcrypts=require('bcryptjs');
const {validationResult}=require('express-validator');
const jwt =require('jsonwebtoken');

exports.autenticarUsuario=async(req,res)=>{
    // valdiar si hay errores
    const errores =validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()});
    }
    const {email,password}=req.body;
    try {
        // revisar que el email exitas
        let usuario=await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'});
        }
        // revisar que el password 
        const passCorrecto=await bcrypts.compare(password,usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:'Contraseña incorrecta'});
        }

        // creabndo el jwt
        const payload={
            usuario:{
                id:usuario.id
            }
        };
        // firmando el jwt
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn:3600 //tiempo de autenticacion
        },(error,token)=>{
            if(error) throw error;

              // mensaje de confirmacion
        res.json({token});
        });


    } catch (error) {
        console.log(error);
    }
}
// obtiene que usuario esta autenticado
exports.usuarioAutenticado=async(req,res)=>{
    try {
        const usuario=await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
}
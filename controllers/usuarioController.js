
const Usuario=require('../models/Usuario');
const bcrypts=require('bcryptjs');
const {validationResult}=require('express-validator');
const jwt =require('jsonwebtoken');

exports.crearUsuario= async(req,res)=>{

    // valdiar si hay errores
    const errores =validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()});
    }

    // extraer email, usuario y password
    const {email,password}=req.body;
    try {
        // validacion de que el usuario sea unico
       
        let usuario =await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario o correo ya existe'});
        }

        // crear el nuevo usuario
        usuario=new Usuario(req.body);

        // hashear el password
        const salt=await bcrypts.genSalt(15);
        usuario.password=await bcrypts.hash(password,salt);

        // guiardar usuario
        await usuario.save();

        // crear y firmar el jwt
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
        res.status(400).send('Eror kisamado');
    }
}
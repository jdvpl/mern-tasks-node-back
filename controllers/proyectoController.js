const Proyecto=require('../models/Poryecto');
const {validationResult}=require('express-validator');
exports.crearProyecto=async(req,res)=>{
    // revisar si hay errores
    const errores =validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()});
    }



    try {
        const proyecto=new Proyecto(req.body);

        // gaurdar el creador via jwt
        proyecto.creador=req.usuario.id;

        // guardamos el proyectof
        proyecto.save();
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
// Obtiene los proyectos del usuarioActual
exports.ObtenerProyectos=async(req,res)=>{
    try {
        const proyectos=await Proyecto.find({creador:req.usuario.id}).sort({creado:-1});
        res.json({proyectos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Actualiza un proyecto
exports.ActualizarProyecto=async(req,res)=>{

    const errores =validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()});
    }
    // extrear la informacion del proyecto
    const {nombre}=req.body;
    const NuevoProyecto={};

    if(nombre){
        NuevoProyecto.nombre=nombre;
    }

    try {
        // revisar el id
        let proyecto=await Proyecto.findById(req.params.id);
        // si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }
        // verificar el creador
        if(proyecto.creador.toString() !==req.usuario.id){
            return res.status(401).json({msg:'No Autorizado'});
        }
        // actualizar
        proyecto=await Proyecto.findOneAndUpdate({_id:req.params.id},{$set:NuevoProyecto},
            {new:true});
            res.json({proyecto});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

exports.EliminarProyecto=async(req,res)=>{
    try {
         // revisar el id
         let proyecto=await Proyecto.findById(req.params.id);
         // si el proyecto existe o no
         if(!proyecto){
             return res.status(404).json({msg:'Proyecto no encontrado'});
         }
         // verificar el creador
         if(proyecto.creador.toString() !==req.usuario.id){
             return res.status(401).json({msg:'No Autorizado'});
         }
         //Eliminar el proyecto
         await Proyecto.findOneAndRemove({_id:req.params.id});
         res.json({msg:'Proyecto eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}
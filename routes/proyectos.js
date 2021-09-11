const express=require('express');
const router =express.Router();
const proyectoController=require('../controllers/proyectoController');
const auth=require('../middleware/auth');
const {check}=require('express-validator');
// crea proyectos 
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto);
// obetner
router.get('/',
auth,
proyectoController.ObtenerProyectos);

// actualizar poryectos
router.put('/:id',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.ActualizarProyecto
    );

// borra un
router.delete('/:id',
    auth,
    proyectoController.EliminarProyecto
    );

module.exports=router;
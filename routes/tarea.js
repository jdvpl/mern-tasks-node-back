const express=require('express');
const router =express.Router();
const tareaController=require('../controllers/tareaController');
const auth=require('../middleware/auth');
const {check}=require('express-validator');

// crear una tarea
// api/tareas
router.post('/',
    auth,
    [
       check('nombre','El nombre es obligatorio' ).not().isEmpty(),
       check('proyecto','El proyecto es obligatorio' ).not().isEmpty()
    ],
    tareaController.crearTarea
    );
    // obtener las tareas por poryecto
router.get('/',
    auth,
    tareaController.ObtenerTarea);
// actualizar tarea
router.put('/:id',
    auth,
    tareaController.ActualizarTarea
);
// eliminar tarea
router.delete('/:id',
    auth,
    tareaController.EliminarTarea
);
module.exports=router;
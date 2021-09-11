// rutas para autenticar usuarios
const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');
// dependemncia para validar 
const auth = require('../middleware/auth');

// iniciar sesion

// endpoint /api/auth
router.post('/',
    authController.autenticarUsuario);
    // obtiene el usuario autenticado

router.get('/',
    auth,
    authController.usuarioAutenticado
    )
module.exports=router;
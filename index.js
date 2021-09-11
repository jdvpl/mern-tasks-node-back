// importando express
const express=require('express');
const conectarDb=require('./config/db');
const cors=require('cors');
// crear el servidor
const app=express();

// conectar a la base de datos
conectarDb();

// habilitar cors
app.use(cors());
// habilitar express.json
app.use(express.json({extended:true}))
// se crea el puerto
const port =process.env.PORT || 4000;

// importar rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
// routing de tareas
app.use('/api/tareas',require('./routes/tarea'));

// arrancar la app
app.listen(port, '0.0.0.0',()=>{
    console.log(`corriendo desde el puerto ${port}`)
});

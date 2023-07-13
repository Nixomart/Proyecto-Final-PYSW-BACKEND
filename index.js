const express = require('express');
const cors = require('cors');
const { mongoose } = require('./database');
var app = express();
//middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
//Cargamos el modulo de direccionamiento de rutas
app.use('/api/alumno', require('./routes/alumno.route.js'));
app.use('/api/asistencia', require('./routes/asistencia.route.js'));
app.use('/api/ejercicio', require('./routes/ejercicio.route.js'));
app.use('/api/entrenador', require('./routes/entrenador.route.js'));
app.use('/api/rutina', require('./routes/rutina.route.js'));
app.use('/api/administrativo', require('./routes/administrativo.route.js'));
app.use('/api/encargado', require('./routes/encargado.route.js'));
app.use('/api/categoria', require('./routes/categoria.route.js'));
app.use('/api/insumo', require('./routes/insumo.route.js'));
app.use('/api/clase', require('./routes/clase.route.js'));
app.use('/api/cuota', require('./routes/cuota.route.js'));
app.use('/api/plan', require('./routes/plan.route.js'));
app.use('/api/rol', require('./routes/rol.route.js'));
app.use('/api/usuario', require('./routes/usuario.route.js'));
app.use('/api/mercadopago', require('./routes/mercadopago.route.js'))
app.use('/api/pagos', require('./routes/pago.routes.js'))
//setting
app.set('port', process.env.PORT || 3000);
//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'));
});
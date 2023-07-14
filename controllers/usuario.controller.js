const { default: mongoose } = require('mongoose');
const Usuario = require('../models/usuario')
const jwt = require('jsonwebtoken');
const Alumno = require('../models/alumno');


const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    var usuario = await Usuario.find().populate('rol');
    res.json(usuario);
}


usuarioCtrl.createAlumnoYUsuario = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { apellido, nombre, email, dni, nroCelular, domicilio } = req.body;
    try {
      // Crear el usuario
      const usuario = new Usuario(req.body.usuario);
      const usuarioGuardado = await usuario.save();
  
      // Crear el alumno con el ObjectId del usuario
      const alumno = new Alumno({
        apellido,
        nombre,
        dni,
        email,
        nroCelular,
        domicilio,
        usuario: usuarioGuardado._id,
      });
      const alumnoGuardado = await alumno.save();
  
      await session.commitTransaction();
      session.endSession();
      res.status(200).json({ message: 'Usuario creado', status: '1' });
      console.log('Usuario y alumno creados con éxito', alumnoGuardado);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(200).json({ message: 'Usuario NO creado', status: '0' });
      console.error('Error al crear usuario y alumno:', error);
    }
  };


  usuarioCtrl.loginUsuario = async (req, res) => {
    console.log("ENTRA*************************");
    //en req.body se espera que vengan las credenciales de login
    //defino los criterios de busqueda en base al username y password recibidos
    const criteria = {
        nombreUsuario: req.body.nombreUsuario,
        password: req.body.password
    }
    try {//el método findOne retorna un objeto que cumpla con los criterios de busqueda
        const user = await Usuario.findOne(criteria).populate("rol");
        console.log("USUARIO ENCONTRADOOO: ", user);
        if (!user) {
            res.json({
                status: 0,
                msg: "Usuario no encontrado"
            })
        } else {
            console.log("USUARIO QUE INGRESA: ", user);
            const unToken = jwt.sign({ id: user._id, rol: user.rol.nombreRol }, "secretkey");
            if (user.rol.nombreRol == 'alumno') {
                //Solo obtener alumno info.
                const alumonfind = await Alumno.find({usuario: user._id})
                res.json({
                    status: 1,
                    alumno: alumonfind,
                    msg: "Usuario encontrado",
                    username: user.nombreUsuario, 
                    rol: user.rol, 
                    userid: user._id, 
                    token: unToken
                })                
                //Solo obtener alumno.
            }
            if (user.rol.nombreRol == 'entrenador') {
                //Solo obtener entrenador info.
                res.json({
                    status: 1,
                    msg: "Usuario encontrado",
                    username: user.nombreUsuario, 
                    rol: user.rol, 
                    userid: user._id, 
                    token: unToken
                })                
                //Solo obtener entrenador.
            }
            
            if (user.rol.nombreRol == 'administrador') {
                //Solo obtener entrenador info.
                res.json({
                    status: 1,
                    msg: "Usuario encontrado",
                    username: user.nombreUsuario, 
                    rol: user.rol, 
                    userid: user._id, 
                    token: unToken
                })                
                //Solo obtener entrenador.
            }
            


        }
    } catch (error) {
        console.log("ERROR AL LOGUEARSE: ", error);
        res.json({
            status: 0,
            msg: 'ERROR AL INGRESAR AL SISTEMA'
        })
    }
}



usuarioCtrl.getUsuarioId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({
                status: '0',
                msg: 'Usuario no encontrada'
            });
        }
        res.json(usuario);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación.'
        });
    }
};

usuarioCtrl.createUsuario = async (req, res) => {

    var usuario = new Usuario(req.body);
    try {
        await usuario.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Usuario guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

usuarioCtrl.editUsuario = async (req, res) => {
    const vusuario = new Usuario(req.body);
    try {
        await Usuario.updateOne({ _id: req.body._id }, vusuario);
        res.json({
            'status': '1',
            'msg': 'Usuario updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        await Usuario.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Usuario removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}


usuarioCtrl.loginUsuario = async (req, res) => {
    //en req.body se espera que vengan las credenciales de login
    //defino los criterios de busqueda en base al username y password recibidos
    const criteria = {
        nombreUsuario: req.body.nombreUsuario,
        password: req.body.password
    }
    try {//el método findOne retorna un objeto que cumpla con los criterios de busqueda
        const user = await Usuario.findOne(criteria).populate("rol");
        console.log("USUARIO QUE QUIERE INGRESAR FIND: ", user);
        if (!user) {
            res.json({
                status: 0,
                msg: "Usuario no encontrado"
            })
        } else {
            const unToken = jwt.sign({ id: user._id, rol: user.rol.nombreRol }, "secretkey");
            res.json({
                status: 1,
                msg: "Usuario encontrado",
                username: user.nombreUsuario, //retorno información útil para el frontend
                rol: user.rol, //retorno información útil para el frontend
                userid: user._id, //retorno información útil para el frontend
                token: unToken
            })
        }
    } catch (error) {
        console.log("ERROR LOGIN USUARIO: ", error);
        res.json({
            status: 0,
            msg: 'error'
        })
    }
}

module.exports = usuarioCtrl;
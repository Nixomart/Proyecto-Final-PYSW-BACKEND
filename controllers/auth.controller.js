const jwt = require('jsonwebtoken');
const authCtrl = {}
const alumno = require('../models/alumno');

/*Verifica el prefil del usuario logeado, solo deja seguir si es ADMINISTRATIVO*/
authCtrl.verifyTokenAdmins = async(req, res, next) => {

    if (!req.headers.authorization) {
        res.json({ message: 'Unauthorized request.' })
    }
    //se espera formato -> Bearer XXXX , interesa el token en pos(1) del array
    const token = req.headers.authorization.split(' ')[1];
    console.log("--------------------TOKEN ADMIIINNN:", token);
    if (token === null) {
        res.json({ message: 'no Unauthorized request.' })
    }

    const payload = jwt.verify(token, "secretkey");

    console.log(payload);
    req.userId = payload._id;
    req.userRol = payload.rol;

    if (req.userRol == "administrativo") {
        console.log("correcto es administrador");
        next();
    } else {
        res.json({
            message: 'No autorizado - Solo Usuarios Administrativos' + ' su perfil es : ' +
                req.userRol
        })
    }
}

/*Verifica el prefil del usuario logeado, solo deja seguir si es ENCARGADO*/
authCtrl.verifyTokenEncargado = async (req, res, next) => {
    //las llamadas a la API debieran tener un header authorization
    if (!req.headers.authorization) {
        res.json({ 'status': '0', 'msg': 'Unauthorized request.' })
    }
    //se espera formato -> Bearer XXX, interesa el token en pos(1) del arrayTexto
    const token = req.headers.authorization.split(' ')[1];

    if (token == null) {
        res.json({ 'status': '0', 'msg': 'Unauthorized request.' });
    }
    const payload = jwt.verify(token, "secretkey");

    console.log(payload);
    req.userId = payload._id;
    req.userRol = payload.rol;

    if (req.userRol == "encargado") {
        console.log("correcto es encargado");
        next();
    } else {
        res.json({
            message: 'No autorizado - Solo Usuarios Encargado' + 'su perfil es : ' +
                req.userRol
        })
    }
}

/*Verifica el prefil del usuario logeado, solo deja seguir si es ENTRENADOR*/
authCtrl.verifyTokenEntrenador = async (req, res, next) => {
    //las llamadas a la API debieran tener un header authorization
    if (!req.headers.authorization) {
        res.json({ 'status': '0', 'msg': 'Unauthorized request.' })
    }
    //se espera formato -> Bearer XXX, interesa el token en pos(1) del arrayTexto
    const token = req.headers.authorization.split(' ')[1];
    if (token == null) {
        res.json({ 'status': '0', 'msg': 'Unauthorized request.' });
    }
    const payload = jwt.verify(token, "secretkey");

    console.log(payload);
    req.userId = payload._id;
    req.userRol = payload.rol;

    if (req.userRol == "entrenador") {
        console.log("correcto es entrenador");
        next();
    } else {
        res.json({
            message: 'No autorizado - Solo Usuarios Entrenador' + 'su perfil es : ' +
                req.userRol
        })
    }
}

//agregado por nico
authCtrl.verifyToken = async (req, res, next) => {
    console.log("**********************ENTRA ACA EN VERIFY TOKEN**********************");
    //las llamadas a la API debieran tener un header authorization
    if (!req.headers.authorization) {
        res.json({ 'status': '0', 'msg': 'Unauthorized request.' })
    }
    //se espera formato -> Bearer XXX, interesa el token en pos(1) del arrayTexto
    const token = req.headers.authorization.split(' ')[1];
    if (token == null) {
        res.json({ 'status': '0', 'msg': 'Unauthorized request.' });
    }
    const payload = jwt.verify(token, "secretkey");
    res.status(200).json(payload)
}

authCtrl.getDataUser = async (req, res, next) => {
    //las llamadas a la API debieran tener un header authorization
    if (!req.headers.authorization) {
        res.json({ 'status': '0', 'msg': 'Unauthorized request.' })
    }
    //se espera formato -> Bearer XXX, interesa el token en pos(1) del arrayTexto
    const token = req.headers.authorization.split(' ')[1];
    if (token == null) {
        res.json({ 'status': '0', 'msg': 'Unauthorized request.' });
    }

    console.log("TOKEN EN GET DATA USER: ", token);
    const payload = jwt.verify(token, "secretkey");
    if (payload.rol == 'alumno'){
        console.log(payload);
        const alumnooo = await  alumno.find({usuario: payload.id}).populate('plan')
        console.log("Alumno: ", alumnooo);
      res.status(200).json(alumnooo)
    }

}


//exportamos el manejador de token
module.exports = authCtrl;
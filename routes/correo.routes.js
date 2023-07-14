//manejador de rutas
const express = require("express");
const router = express.Router();
const Pago = require("../models/pago");

const nodemailer = require("nodemailer");
const contra = "ygnowsdniwvnhtqa";
//definimos las rutas para la gestion de rutina
router.post("/send-email", async (req, res) => {
  const { nombre, username, password, emailTo } = req.body;
  try {
    contentHTML = `
    <h1>Hola! ${nombre} Estos son tus datos! para ingresar al sistema!</h1>
    <ul>
        <li>Tu usuario: ${username}</li>
        <li>Tu contraseña: ${password}</li>
    </ul>
`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `nixocosas22@gmail.com`,
        pass: `${contra}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: `Informacion de usuario para ingresar al sistema `, // sender address,
      to: `${emailTo}`,
      subject: `hola! ${nombre} esta es tu Informacion de usuario! `,
      html: contentHTML,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res
      .status(200)
      .json({ message: "Mensaje enviado con exito!", status: "1" });
  } catch (error) {
    console.log("ERROR AL ENVIAR CORREO CON INFO: ", error);
    res
      .status(500)
      .json({ message: "Mensaje NOO enviado!", status: "0", error: error });
  }
});

module.exports = router;

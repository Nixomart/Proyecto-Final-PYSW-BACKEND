const express = require("express");
const router = express.Router();
const mpcontroller = require("../controllers/mercadopago.controller");
const mercadopago = require("mercadopago");
const qrCode = require('qrcode');

mercadopago.configure({
    //access token de prueba de mi cuenta ajsj deberian usar de su cuenta pero fijense si funca 
    access_token: "APP_USR-1546690050022270-012519-8faec084bd0e1627edb05a0877a7aadd-1295500452"
})
router.post("/crearpago", (req, res) => {
  const { precio, descripcion } = req.body;
  let preference = {
    back_urls: {
      success: "http://localhost:3000/success",
    },
    items: [
      {
        title: descripcion,
        unit_price: precio,
        quantity: 1,
      },
    ],
    notification_url: "http://localhost:3000/notificaciones",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
        const initPoint = response.body.init_point;

        // Genera el código QR a partir de la URL del init_point
        qrCode.toDataURL(initPoint, function (err, qrDataURL) {
          if (err) {
            console.error('Error al generar el código QR:', err);
            res.status(500).send('Error al generar el código QR');
          } else {
            // Envia el código QR como respuesta
            res.status(200).json({message: qrDataURL, status: '100', enlance: initPoint});

          }
        });
    })
    .catch(function (error) {
      console.log(error);
    });
});

//no funciona, intente con ngrok pero tampoco
router.post("/notificaciones", async (req, res) => {
    console.log("######################notificarr####################################");
    const {query} = req
    const topic = query.topic || query.type;
    console.log("#############topic################", /* topic */);
  
    switch (topic) {  
      case "payment":
        const paymentId = query.id || query["data.id"];
        /* console.log(topic, "getting payment", paymentId); */
        
        const payment = await mercadopago.payment.findById(paymentId);
        /* console.log(payment);
   */
        var {body} = await mercadopago.merchant_orders.findById(
          payment.body.order.id
        );
        break;
      case "merchant_order":
        const orderId = query.id;
        console.log(topic, "getting payment", orderId);
        var {body} = await mercadopago.merchant_orders.findById(orderId);
        break;
    }
    //esto seria la informacion real y nesesaria para saber el estado de la orden
    console.log('merchantOrder###################### ### ###', body.payments)
    var paidAmount = 0
  
    body.payments.forEach(function (payment) {
        if (payment.status === 'approved') {
          paidAmount += payment.transaction_amount;
        }
      });
    if(paidAmount >= body.total_amount){
      console.log('PAGADOOOOO')
    }else{
      console.log('NOOO PAGADOOOOO')
    }
  
    res.send()
    res.status(200)
});

module.exports = router;

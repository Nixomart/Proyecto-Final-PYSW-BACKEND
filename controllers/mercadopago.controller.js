const mercadopago = require("mercadopago");

const mpcontroller = {}
mercadopago.configurations.setAccessToken('')
mpcontroller.createpago = async(req, res) =>{
    const {precio, title} = req.body
    let preference = {
        back_urls: {
          success: "http://localhost:3000/success",
        },
        items: [
          {
            title: title,
            unit_price: precio,
            quantity: 1,
          },
        ],
        notification_url: "https://9edd-170-84-124-24.sa.ngrok.io/notificar",
      };
    
      mercadopago.preferences
        .create(preference)
        .then(function (response) {
          /* console.log("response", response); */
          res.send(`<a href=${response.body.init_point}>PAGAR</a>`);
          // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
        })
        .catch(function (error) {
          console.log(error);
        });
}
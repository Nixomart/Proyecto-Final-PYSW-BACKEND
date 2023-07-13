const mongoose = require('mongoose');
/* const URI = 'mongodb://localhost/proyectofinaldb'; */
require("dotenv").config()
mongoose.connect(process.env.MONGO_URI)
.then(db=>console.log('DB is connected'))
.catch(err=>console.error(err))
module.exports = mongoose;
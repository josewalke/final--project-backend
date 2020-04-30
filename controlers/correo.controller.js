const nodemailer = require('nodemailer')
const messageModel = require('../models/messages.model')
const UserModel = require('../models/users.model')
module.exports = {
  enviar
};

const heroku = process.env.heroku;
let config;
if (heroku) {
  config = process.env
}else {
  config = require("../.env");

}

  var intervalo = setInterval(email, 3600000)
  function email(req, res) {
    var fecha = new Date()
    var hora = fecha.getHours()
    if(hora === 20){
      UserModel
      .find({role: 'cliente'})
      .then(usuario => {
        for(let i=0; i<usuario.length;i++){
          messageModel
          .find({user_id: usuario[i]._id})
          .then(mensaje => {
            let contador = 0
            for(let x=0;x<mensaje.length;x++){
              if(mensaje[x].respuesta_leida){
                if(mensaje[x].verificado === false){
                  contador++
                }
              }
            }
            if(contador > 0){
              enviar(contador,usuario[i].email)
            }
          })
          .catch(err => handdleError(err, res));
        }
      })
      .catch((err) => handdleError(err, res))
    }
  }
   intervalo

function enviar(contador,email){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.password
    }
  })
  const mailOptions = {
    from: config.email, // sender address
    to: email, // list of receivers
    subject: 'bomberos', // Subject line
    html: `<p>Holaa</p>
    <h1>Tienes ${contador} mensajes nuevos</h1>
                        ` // plain text body
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) { console.log(err) } else { console.log(info) }
    res.json(response + 1)
  })
  // res.json('enviado')
}



function handdleError(err, res) {
  return res.status(400).json(err)
}
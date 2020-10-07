const UserModel = require('../models/users.model')
const nodemailer = require('nodemailer')
const respuestaModel = require('../models/respuesta')
const relacion_pregunta_temaModel = require('../models/pregunta_tema')
const questionsModel = require('../models/questions.model')
const temaModel = require('../models/tema.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { find } = require('../models/users.model')

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  getMe,
  new_pass,
  lolo,
  getUserByEmail
}

function getAllUsers(req, res) {
  console.log('alluser')
  UserModel
    .find({ $or: [{role:'cliente'},{role:'prueba'}]})
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getUserById (req, res) {
  UserModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}
function getUserByEmail (req, res){
  UserModel
  .find({email: req.params.email})
  .then(response => res.json(response))
  .catch((err) => handdleError(err, res))
}

function getMe (req, res) {
  console.log(res.locals.reboot_user)
  return res.json(res.locals.reboot_user)
}

function deleteUserById (req, res) {
  UserModel
    .remove({ _id: req.params.id })
    .then(response => res.json(response))
    .catch(err => handdleError(err, res))
}

function updateUser (req, res) {
  UserModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))

}

//Poner negativos cada 1min
var intervalo2 = setInterval(negativos, 3600000)
// var intervalo2 = setInterval(negativos, 1000)

function negativos(req, res){
  UserModel
    .find({role: 'cliente'})
    .then(usuarios => {
      for(let i=0;i<usuarios.length; i++){
        if(usuarios[i].inactividad + 86400000 < new Date().getTime()){
          const body = {
            inactividad: new Date().getTime(),
            negativos: usuarios[i].negativos - 10
          }
          UserModel
          .findByIdAndUpdate(usuarios[i]._id, body)
          .then(response => console.log(true))
          .catch((err) => handdleError(err, res))
        }
      }
    })
    .catch((err) => handdleError(err, res))
}
intervalo2

// desactivar usuarios cada 1min
var intervalo3 = setInterval(desactivar, 3600000)
// var intervalo3 = setInterval(desactivar, 1000)


function desactivar(req, res){
  UserModel.find({role:'cliente', active:true}).then(usuarios => {
    console.log(usuarios.length)
    for(let i=0;i<usuarios.length; i++){
      let suscription_end_active = parseInt(usuarios[i].suscription_end_active)
      if(suscription_end_active < new Date().getTime()){
        UserModel
        .findByIdAndUpdate({_id: usuarios[i]._id},{active: false})
        .then(response => console.log(response))
      }else{
        console.log('sigue siendo valido ')
      }
    }
  })
}
intervalo3


async function new_pass(req,res){
  const hashedPwd = bcrypt.hashSync(req.body.password, 10)
  let body = {
    password: hashedPwd
  }
  console.log(body)
  UserModel
    .findByIdAndUpdate(res.locals.reboot_user._id, body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}

async function lolo(req,res){
  console.log(req.body)
  UserModel
  .findOne(req.body)
  .then(response =>{
    // const userData = {
    //   nickName: response[0].nickName,
    //   firstName: response[0].name,
    //   lastName: response[0].lastName,
    //   email: response[0].email,
    //   role: response[0].role,
    //   userId: response[0]._id,
    //   phone: response[0].phone,
    //   img_url: response[0].img_url,
    //   mensajes: response[0].mensajes,
    //   MensajesTotales: response[0].MensajesTotales,
    //   aprobados: response[0].aprobados,
    //   suspendidos: response[0].suspendidos,
    //   total: response[0].total,
    //   suscription_type: response[0].suscription_type,
    //   active: response[0].active,
    //   negativos: response[0].negativos,
    //   suscription_end_active: response[0].suscription_end_active,
    //   active: response[0].active,
    //   provincia: response[0].provincia
    // }
    // const token = jwt.sign(userData, "secret", { expiresIn: "1w" });
    // console.log(token)
    console.log(response)
    res.json(response)
  }).catch((err) => handdleError(err, res))
}


function handdleError (err, res) {
  return res.status(400).json(err)
}

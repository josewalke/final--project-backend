const messageModel = require('../models/messages.model')

module.exports = {
  createMessage,
  getAllMessages,
  updateMessages,
  getMessageById
}

function createMessage(req, res) {
  const body ={
    user_id: req.params.id,
    respuesta_leida: req.body.respuesta_leida,
    pregunta_id: req.body.pregunta_id,
    pregunta: req.body.pregunta,
    respuesta: req.body.respuesta,
    explicacion: req.body.explicacion,
    verificada: req.body.verificada
  }
  console.log(body)
  messageModel.create(body)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

function getAllMessages(req, res) {
  messageModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateMessages(req, res) {
  messageModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}

function getMessageById(req, res) {
  console.log("una sola duda");
  messageModel.find({user_id: req.params.id})
    .then(response => res.json(response))
    .catch(err => handdleError(err, res));
}
const messageModel = require('../models/messages.model')

module.exports = {
  createMessage,
  getAllMessages,
  updateMessages,
  getMessageById
}

function createMessage(req, res) {

  messageModel.create(req.body)
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
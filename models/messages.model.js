const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  pregunta_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  pregunta: {
    type: String
  },
  respuesta: {
    type: String
  },
  respuesta_leida: {
    type: Boolean,
    default: false
  },
  verificada: {
    type: Boolean,
    default: false
  },
  type: {
    type: String
  },
  test_id:{
    type: mongoose.Schema.Types.ObjectId
  }
})
const messageModel = mongoose.model('message', messageSchema)

module.exports = messageModel
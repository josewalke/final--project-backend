const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Campo obligatorio"]
  },
  nickName: {
    type: String,
    required: [true, "Campo obligatorio"]
  },
  lastName: {
    type: String,
    required: [true, "Campo obligatorio"]
  },
  email: {
    type: String,
    required: [true, "Campo obligatorio"],
    validate: {
      validator(value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          value
        );
      }
    },
    unique: [true, "Este email ya existe"]
  },
  img_url: {
    type: String,
    default:
      "https://icon-library.net/images/avatar-icon-png/avatar-icon-png-8.jpg"
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "cliente"],
    required: false,
    default: "cliente"
  },
  phone: {
    type: Number,
    required: [true, "Campo obligatorio"]
  },
  createdAt: {
    type: Number,
    default: Date.now() // Get a timestamp :)
  },
  suscription_type: {
    type: String,
    default: 'basic'
  },
  suscription_start: {
    type: Date
  },
  suscription_end: {
    type: Date
  },
  active: {
    type: Boolean
  },
  mensajes: {
    type: String,
    default: '0'
  },
  MensajesTotales: {
    type: String,
    default: '0'
  },
  aprobados: {
    type: String,
    default: '0'
  },
  suspendidos: {
    type: String,
    default: '0'
  },
  total: {
    type: String,
    default: '0'
  },
  inactividad:{
    type: Number
  },
  negativos:{
    type:Number,
    default: '0'
  }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

const router = require("express").Router();
const { authenticated, me } = require("../services/auth.service");

const {
  createTema,
  getAllTemas,
  updateTema
} = require("../controlers/tema.controller");


router.post('/', createTema)

router.put('/:id',updateTema)

router.get('/', getAllTemas)

router.delete('/:id')

module.exports = router;
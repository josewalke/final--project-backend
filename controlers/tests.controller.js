const testModel = require('../models/test.model')
const questionsModel = require('../models/questions.model')


module.exports = {
  createTest,
  getAllTests,
  getTestById,
  createRandomTest
}

function createTest(req, res) {

  const testBody = {
    user_id: req.body.me,
    aciertos: req.body.aciertos,
    fallos: req.body.fallos,
    no_contestada: req.body.blanco,
    mostrar_solucion: req.body.mostrar
  };

  testModel.create(testBody)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

function getAllTests(req, res) {
  console.log('todos los tests')
  testModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function getTestById(req, res) {
  console.log("un solo test")
  testModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handdleError(err, res))
}

function updateTest(req, res) {
  testModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(response => res.json('actualizado correctamente'))
    .catch((err) => handdleError(err, res))
}
var list = []
async function createRandomTest(req, res) {
  let num = 2
  let no_contestadas = []
  list = await questionsModel.find()
  var testQuestions = list.sort(function () { return 0.5 - Math.random() }).splice(0,num)

  no_contestadas = testQuestions.map((i) => {
    return i._id
  })

  // for(let i=0; i<testQuestions.length; i++){
  //   no_contestadas.push(testQuestions[i]._id)
  // }
  res.json(testQuestions)
  // console.log(no_contestadas)
  // res.json(no_contestadas)

  const testBody = {
    user_id: req.body.objectId,
    title: 'test prueba',
    aciertos: [],
    fallos: [],
    no_contestada: no_contestadas,
    mostrar_solucion: false
  }
  //  console.log(testBody)

  testModel.create(testBody)
    .then(response => res.json(response))
    .catch(err => {
      res.status(403).json({ error: err });
    });
}

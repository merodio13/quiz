var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//autoload de comandos con :quizId
router.param('quizId, quizController.load);  //autoload : quizId

//definicion de rutas en quizes

router.get('/quizes',         quizController.index);
router.get('/quizes/:quizId(\\d+)' , quizController.show);
router.get('/quizes/:quizId(\\d+)/answer' , quizController.answer);

module.exports = router;

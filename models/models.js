var path= require ('path');

//Cargar modelo ORM

var Sequelize = require ('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, 
{dialect: "sqlite", storage:"quiz.sqlite"});

//Importar la definicion de la tabla quiz en quiz.js
 var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; //exportar definicion de la tabla quiz
//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().sucess(function(){
//sucess(..) ejecuta el manejador una vez creada la tabla
Quiz.count().sucess(function(count){
if(count === 0) { //la tabla inicializa solo si esta vacia
Quiz.create({pregunta: 'Capital de Italia',
             respuesta: 'Roma'
            })
.sucess(function(){console.log('Base de datos inicializada')});
};
});
});


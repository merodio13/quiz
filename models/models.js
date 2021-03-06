var path = require ('path');

// Postgres DATABASE_URL = postgres://user:passwd@hots:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null); 
var pwd = (url[3] || null);
var protocol = (url[1] || null); 
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require ('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize (DB_name, user, pwd,
    { dialect: protocol,
      protocol: protocol,
      port: port,
      host: host,
      storage: storage, // solo SQLite (.env)
      omitNull : true   // solo Postgres
    }
);

// Importar la definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

//importar definicion de la t5abla Comment
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);


//importar definicion de la tabla comment
var user_path = path.join(__dirname, 'user');
var User = sequelize.import(user_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//los quizes pertenecen a un usuario registrado
Quiz.belongsTo(User);
User.hasMany(Quiz);

// exportar definición de tabla Quiz
exports.Quiz = Quiz; 
exports.Comment = Comment;
exports.User = User;

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {

User.count().then(function (count){
if(count === 0) { 
User.bulkCreate(
[ {username: 'admin', password: '1234', isAdmin: true},
{username: 'pepe', password: '5678'}
]
).then(function(){
console.log('Base de datos (tabla user) inicializada');

  // success (...) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) { // la tabla se inicializa solo si está vacía
     Quiz.bulkCreate(
	[ {pregunta: 'Capital de Italia', respuesta: 'Roma', UserId: 2} ,
       { pregunta: 'Capital de Portugal', respuesta: 'Lisboa', UserId: 2}
	]
  ).then(function(){console.log('Base de datos (tabla quiz) inicializada')});
    };
   });
  });
 };
 });
 });



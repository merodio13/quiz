var users = { admin: {id:1, username:"admin" , password:"1234"},
              pepe: {id:2, username:"pepe" , password:"5678"},
              clara: {id:3, username:"clara" , password:"clara"},
              belen: {id:4, username:"belen" , password:"belen"}
             };

//Comprueba si el usuario esta regustrado en users
//si autentificacion falla o hay errores se ejecuta callback(error)
exports.autenticar = function(login , password, callback){
if(users[login]){
if (password ==users[login].password){
callback(null, users[login]);
}
else { callback(new Error('Password erroneo.'));}
}else{callback(new Error('No existe usuario.'));}
};

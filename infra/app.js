connection = require ('./conexao');
Tabelas = require('./tabelas');
const express = require('./../configs/customExpress')

module.exports = connection.connect(function(err) {
  
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  } else {
    console.log('Connectado ao DB, id: ' + connection.threadId);
    Tabelas.init(connection);
    console.log("Tabelas criadas");
  }

  const app = express();
  app.listen(3000);
  console.log("Servidor API Express rodando");
  return app;
});


const express = require('express');
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
//
app.get('/', (req, res) => {
  res.send({ mensaje: 'hola mundo' });
});
//endpoint - rutas
let contador = 58;
app.get('/visitas', (req, res) => {
  contador++;
  res.send(`<h2>Bienvenido nro. ${contador}</h2>`);
});

const express = require('express');
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
//
app.get('/', (req, res) => {
  res.send('Bienvenido!');
});
//endpoint - rutas
app.get('/productos', (req, res) => {
  res.send(`<h2>Productos</h2>`);
});
app.get('/productoRandom', (req, res) => {
  res.send(`<h2>Producto Random</h2>`);
});

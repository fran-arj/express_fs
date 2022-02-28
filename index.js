const express = require('express');
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
//
function generateRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}
//
app.get('/', (req, res) => {
  res.send('Bienvenido!');
});
//endpoint - rutas
app.get('/productos', (req, res) => {
  let salida = '';
  const Contenedor = require('./class/Contenedor.js');
  const miArchivo = './txtFiles/productos.txt';
  const misDatos = new Contenedor(miArchivo);
  const resultAll = async () => {
    const productos = await misDatos.getAll();
    console.table(productos);
    productos.map((p) => {
      console.log(p.tittle);
      salida += `<p>${p.tittle}</p>`;
      console.log(salida);
    });
    res.send(`<h2>Productos</h2>${salida}`);
  };
  resultAll();
});
app.get('/productoRandom', (req, res) => {
  let salida = '';

  const Contenedor = require('./class/Contenedor.js');
  const miArchivo = './txtFiles/productos.txt';
  const misDatos = new Contenedor(miArchivo);
  const resultID = async (id) => {
    const lengthObj = await misDatos.lengthObj();
    let randomNumber = generateRandomInteger(lengthObj);
    const producto = await misDatos.getById(randomNumber);
    console.table(producto);
    salida = `<p>${producto.tittle}</p>`;
    salida += `<p>${producto.thumbnail}</p>`;
    salida += `<p>${producto.price}</p>`;
    res.send(`<h2>Producto Random</h2>${salida}`);
  };
  resultID();
});

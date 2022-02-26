//fs promises
const fsp = require('fs').promises;
//Clase Contenedor
module.exports = class Contenedor {
  constructor(file) {
    this.file = file;
  }

  // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  async save(objDato) {
    try {
      let contenidoActual = await this.getAll();
      const ids = contenidoActual.map((e) => e.id);
      const maxID = ids.length > 0 ? Math.max(...ids) + 1 : 1;
      objDato.id = maxID;
      contenidoActual = [...contenidoActual, objDato];
      // convertir para guardar
      const objDatoParsed = JSON.stringify(contenidoActual, null, 2);
      await fsp.writeFile(this.file, objDatoParsed);
      console.log('Objeto guardado con el ID: ', maxID);
      return maxID;
    } catch (error) {
      return error;
    }
  }

  // Recibe un id y devuelve el objeto con ese id, o null si no está.
  async getById(idDato) {
    try {
      const contenido = await fsp.readFile(this.file, 'utf-8');
      const contenidoParsed = JSON.parse(contenido);
      const contenidoID = contenidoParsed.find((e) => e.id === idDato);
      return contenidoID === undefined ? null : contenidoID;
    } catch (error) {
      return null;
    }
  }

  // Devuelve un array con los objetos presentes en el archivo.
  async getAll() {
    try {
      const contenido = await fsp.readFile(this.file, 'utf-8');
      const contenidoParsed = contenido === '' ? [] : JSON.parse(contenido);
      return contenidoParsed;
    } catch (error) {
      return [];
    }
  }

  //Elimina del archivo el objeto con el id buscado.
  async deleteById(idDato) {
    try {
      const contenido = await fsp.readFile(this.file, 'utf-8');
      const contenidoParsed = JSON.parse(contenido);
      const contenidoFilter = contenidoParsed.filter((e) => e.id !== idDato);
      // convertir para guardar
      const objDatoSave = JSON.stringify(contenidoFilter, null, 2);
      await fsp.writeFile(this.file, objDatoSave);
      console.log('Objeto ELIMINADO con el ID: ', idDato);
      return true;
    } catch (error) {
      return false;
    }
  }
  // Elimina todos los objetos presentes en el archivo.
  async deleteAll() {
    try {
      const objDatoSave = '';
      await fsp.writeFile(this.file, objDatoSave);
      console.log('Todos los objetos fueron eliminados');
      return true;
    } catch (error) {
      return false;
    }
  }
};

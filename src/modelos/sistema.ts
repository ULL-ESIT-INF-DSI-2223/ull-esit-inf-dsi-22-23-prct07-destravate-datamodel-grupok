import Lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json');
const db = Lowdb(adapter);

// const usuario1 = { nombre: 'Pepe', edad: 23 };
// const usuario2 = { nombre: 'Juan', edad: 24 };

//db.get('usuarios').push(usuario1).write();
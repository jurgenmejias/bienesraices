import {exit} from 'node:process'
import categorias from "./categorias.js";
import precios from './precios.js';
import usuarios from './usuarios.js';
import db from "../config/db.js";
import {Categoria, Precio, Usuario} from '../models/index.js'
// import Categoria from "../models/Categoria.js";
// import Precio from '../models/Precio.js';

const importarDatos = async () => {
    try {
        // Autenticar
        await db.authenticate()
        // Generar las columnas
        await db.sync()

        // Insertar los datos
        // await Categoria.bulkCreate(categorias)
        // console.log('Categorias importados correctamente');
        // exit();

        // await Precio.bulkCreate(precios)
        // console.log('Precios importados correctamente');
        // exit()

        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios)
        ])

        console.log('Datos importados correctamente'),
        exit()
        
    } catch (error) {
        console.log(error);
        exit(1)
    }
}

const eliminarDatos = async () => {
    try {
        // await Promise.all([
        //     Categoria.destroy({where: {}, truncate: true}),
        //     Precio.destroy({where: {}, truncate: true}),
        // ])
        await db.sync({force: true})
        console.log('Datos eliminados correctamente');
        exit()
        
    } catch (error) {
        console.log(error);
        exit(1)
        
    }
}

// "db:importar": "node ./seed/seeder.js -i"
if(process.argv[2] === "-i"){
    importarDatos();
}

if(process.argv[2] === "-e"){
    eliminarDatos();
}
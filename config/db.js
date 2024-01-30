import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5, //maximo de conexiones por usuario
        min: 0, //minimo de conexiones por usuario
        acquire: 30000, //tiempo antes de marcar un error (en milisegundos)
        idle: 10000 //tiempo para liberar conexiones que no se esten usando (en milisegundos)
    },
    operatorAliases: false
});

export default db;
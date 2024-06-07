import {createPool} from 'mysql2/promise'

// Conexion a la base de datos subida en el servidor
// export const pool = createPool({
//     host: '151.106.97.153',
//     user: 'u880599588_test',
//     password: 'HCwf9J9a',
//     port: 3306,
//     database: 'u880599588_test'
// })

// Conexion a la base de datos de forma local
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'presidencia'
})

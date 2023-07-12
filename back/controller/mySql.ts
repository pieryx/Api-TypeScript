
const mysql = require('mysql2');
export const connectionDB = mysql.createConnection({
    host: 'mysql-projetbenabas.alwaysdata.net',
    user: '311910',
    password: 'Dofus1dofus1',
    database: 'projetbenabas_db_marmitonbelike'
});
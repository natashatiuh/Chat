import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'chat',
    password: 'root'
})

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'myroot',
    database: 'test_mysql'
});

// SQL SELECT 공통 함수
export const selectSQL = async (sqlQuery :string) => {
    try {
        const [rows] = await pool.query(sqlQuery);
        return rows;
    } catch (err) {
        console.error(err);
    }
}
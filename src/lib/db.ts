import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : undefined,  // 포트를 숫자로 변환
});

export default pool;

// SQL SELECT 공통 함수
// export const selectSQL = async (sqlQuery :string) => {
//     try {
//         const [rows] = await pool.query(sqlQuery);
//         return rows;
//     } catch (err) {
//         console.error(err);
//     }
// }
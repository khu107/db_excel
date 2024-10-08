import { NextResponse } from "next/server";
import database from "../../../lib/db";

export async function  GET() {
    try {
        console.log("Attempting to connect to the database...");
        const db = await database.getConnection()

        // const columnsQuery = `SHOW COLUMNS FROM test2`;  // test2 테이블의 모든 컬럼
        // const [columns] = await db.execute(columnsQuery);

        // const query = 'SELECT * FROM time';
        // const rows = await db.execute(query);
        // db.release()

        const query = 'SHOW TABLES';
        const [tables] = await db.execute(query);
        db.release();


        return NextResponse.json(tables)
    } catch (error) {
        console.error("Database connection error:", error); // 연결 오류 시 로그 출력
        return NextResponse.json({error:error},{status:500})
    }
}
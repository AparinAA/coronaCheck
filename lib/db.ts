import mysql from 'serverless-mysql';

interface TypeQ {
    query: any,
    values: any
}

const db = mysql({
  config: {
    /*
    host: 'localhost',
    user: 'root',
    password: "12351",
    database: 'currencies',
    */
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }
});

export default async function excuteQuery({ query, values }: TypeQ) {
    try {
        const results: unknown = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
}
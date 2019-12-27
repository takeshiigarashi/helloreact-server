const { Client } = require('pg')
const TestService = require('./TestService.js');

// PostgreSQL Client
const pgClient = new Client({
    host: 'localhost',
    database: 'testdb',
    port: 25432,
    user: 'postgres',
    password: 'postgres'
});


const service = new TestService(pgClient);
pgClient.connect();


(async () => {
    // 登録
    const id = await service.insert({
        col1: 'カラム１',
        col2: 'カラム２',
        col3: 'カラム３'
    });
    console.log("id: " + id);

    // IDで検索
    const result1 = await service.selectById(id);
    console.log(result1.rows);

    // 全件検索
    const result2 = await service.selectAll();
    console.log(result2.rows);

    await pgClient.end();
})();




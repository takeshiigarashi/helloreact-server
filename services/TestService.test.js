var sqlite3 = require('sqlite3');
const TestService = require('./TestService.js');

// DB
sqlite3.verbose();
const db = new sqlite3.Database(':memory:');

// DBの初期化
db.serialize(() => {
    db.run('create table if not exists t_test (\
        id text primary key,\
        col1 text,\
        col2 text,\
        col3 text,\
        sort_order integer)');
});

const service = new TestService(db);


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
    console.log('result1');
    console.log(result1);

    // 全件検索
    const result2 = await service.selectAll();
    console.log('result2');
    console.log(result2);

})();




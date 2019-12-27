const { Client } = require('pg')
const express = require('express');
const cors = require('cors')
const sqlite3 = require('sqlite3');
const TestService = require('./services/TestService.js');

const app = express(); 

// expressの設定
app.use(express.json());
app.use(cors());

// DBの初期化
const database = new sqlite3.Database(':memory:');
database.serialize(() => {
    database.run('create table if not exists t_test (\
        id text primary key,\
        col1 text,\
        col2 text,\
        col3 text,\
        sort_order integer)');
});



app.get('/', (req, res) => {
    res.send('Simple REST API');
});

// t_test の全件取得
app.get('/api/test', (req, res) => {
    const service = new TestService(database);

    console.log('/ai/test is called');
    service.selectAll()
        .then(result => {
            console.log('selectAll then');
            res.send(result);
        });
});

// t_test への登録
app.post('/api/test', (req, res) => {
    const service = new TestService(database);

    service.insert(req.body)
        .then(result => {
            res.send({
                id: result
            });
        });
});

// t_testからID指定での取得
app.get('/api/test/:id', (req,res) => {
    const service = new TestService(database);
    service.selectById(req.params.id)
        .then(result => {
            res.send(result);
        });
});

// t_testの更新
app.put('/api/test/:id', (req, res) => {
    const service = new TestService(database);
    service.update(req.params.id, req.body)
        .then(result => {
            res.send({
                id: result
            });
        });
});

// t_testの削除
app.delete('/api/test/:id', (req, res) => {
    const service = new TestService(database);
    service.delete(req.params.id)
        .then(result => {
            res.send({
                id: result
            });
        });
});


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));


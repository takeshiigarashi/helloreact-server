const { Client } = require('pg')
const express = require('express');
const cors = require('cors')
const TestService = require('./services/TestService.js');

const app = express(); 

// expressの設定
app.use(express.json());
app.use(cors());

// PostgreSQL Client
const pgClient = new Client({
    host: 'localhost',
    database: 'testdb',
    port: 25432,
    user: 'postgres',
    password: 'postgres'
});
pgClient.connect();


app.get('/', (req, res) => {
    res.send('Simple REST API');
});

// t_test の全件取得
app.get('/api/test', (req, res) => {
    const service = new TestService(pgClient);

    console.log('/ai/test is called');
    service.selectAll()
        .then(result => {
            console.log('selectAll then');
            res.send(result.rows);
        });
});

// t_test への登録
app.post('/api/test', (req, res) => {
    const service = new TestService(pgClient);

    service.insert(req.body)
        .then(result => {
            res.send({
                id: result
            });
        });
});

// t_testからID指定での取得
app.get('/api/test/:id', (req,res) => {
    const service = new TestService(pgClient);
    service.selectById(req.params.id)
        .then(result => {
            res.send(result.rows[0]);
        });
});

// t_testの更新
app.put('/api/test/:id', (req, res) => {
    const service = new TestService(pgClient);
    service.update(req.params.id, req.body)
        .then(result => {
            res.send({
                id: result
            });
        });
});

// t_testの削除
app.delete('/api/test/:id', (req, res) => {
    const service = new TestService(pgClient);
    service.delete(req.params.id)
        .then(result => {
            res.send({
                id: result
            });
        });
});


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));


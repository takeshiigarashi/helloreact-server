var uuid = require('uuid/v4');

module.exports = class TestService {
    constructor(client) {
        this.client = client;
    }

    async selectAll() {
        const db = this.client;

        return new Promise((resolve, reject) => {
            db.all("select * from t_test order by sort_order", (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            });
        });
    }

    async selectById(id) {
        const db = this.client;
        return new Promise((resolve, reject) => {
            const stmt = db.prepare("select * from t_test where id = ?");
            stmt.get([id], (err, row) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(row);
                }
            });
        });
    }

    async insert(data) {
        // uuidを生成
        const guid = uuid();

        const sql = 'insert into t_test (id, col1, col2, col3, sort_order) values (?, ?, ?, ?, ?)';
        const values = [
            guid,
            data.col1,
            data.col2,
            data.col3,
            data.sort_order ? data.sort_order : 0
        ];

        const db = this.client;

        return new Promise((resolve, reject) => {
            db.run(sql, values);
            return resolve(guid);
        });
    }

    async update(id, data) {
        const sql = 'update t_test set col1=?, col2=?, col3=?, sort_order=? where id = ?';
        const values = [
            data.col1,
            data.col2,
            data.col3,
            data.sort_order ? data.sort_order : 0,
            id
        ];

        const db = this.client;

        return new Promise((resolve, reject) => {
            db.run(sql, values);
            return resolve(id);
        });
    }

    async delete(id) {
        const sql = 'delete from t_test where id = $1';
        const values = [id];

        const db = this.client;

        return new Promise((resolve, reject) => {
            db.run(sql, values);
            return resolve(id);
        });
    }
}


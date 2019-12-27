

module.exports = class TestService {
    constructor(client) {
        // PostgreSQL Client
        this.client = client;
    }

    async selectAll() {
        console.log('selectAll');
        return this.client.query("select * from t_test order by sort_order");
    }

    async selectById(id) {
        return this.client.query("select * from t_test where id = $1", [id]);
    }

    async insert(data) {
        // uuidを生成
        const resultOfGuid = await this.client.query("select gen_random_uuid() as guid");
        const guid = resultOfGuid.rows[0].guid;

        const sql = 'insert into t_test (id, col1, col2, col3, sort_order) values ($1, $2, $3, $4, $5)';
        const values = [
            guid,
            data.col1,
            data.col2,
            data.col3,
            data.sort_order ? data.sort_order : 0
        ];
        await this.client.query(sql, values);
        return guid;
    }

    async update(id, data) {
        const sql = 'update t_test set col1=$1, col2=$2, col3=$3, sort_order=$4 where id = $5';
        const values = [
            data.col1,
            data.col2,
            data.col3,
            data.sort_order ? data.sort_order : 0,
            id
        ];
        await this.client.query(sql, values);
        return id;
    }

    async delete(id) {
        const sql = 'delete from t_test where id = $1';
        const values = [id];
        await this.client.query(sql, values);
        return id;
    }
}


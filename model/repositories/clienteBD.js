const clienteBD = require('./db.js');

async function selectcliente() {
    const conn = await clienteBD.connect();
    const [rows] = await conn.query('SELECT * FROM cliente;');
    return rows;
}

async function getclienteId(id) {
    const conn = await clienteBD.connect();
    const sql = 'SELECT * FROM cliente WHERE id = ?;';
    const values = [id];
    const [rows] = await conn.query(sql, values);
    if (rows.lenght > 0)
        return rows[0];
    else
        return null;
}

async function insertcliente(cliente) {
    const conn = await clienteBD.connect();
    const sql = 'INSERT INTO cliente(nome, idade,endereco) VALUES (?, ?, ?);';
    const values = [cliente.nome, cliente.idade, cliente.endereco];
    return await conn.query(sql, values);
}

async function deletecliente(id) {
    const conn = await clienteBD.connect();
    const sql = 'DELETE FROM cliente WHERE id = ?;';
    return await conn.query(sql, [id]);
}

async function updatecliente(cliente) {
    const conn = await clienteBD.connect();
    const sql = 'UPDATE cliente SET nome = ?, idade = ?,, endereco = ? WHERE id = ?;';
    const values = [cliente.nome, cliente.idade, cliente.endereco, cliente.id];
    return await conn.query(sql, values);
}

module.exports = {
    selectcliente, insertcliente, deletecliente,
    updatecliente, getclienteId
}

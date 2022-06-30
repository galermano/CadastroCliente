const ClienteRepository = require('../entities/cliente');

async function inserirCliente(value) {
    return await ClienteRepository.create(value);
}

async function buscarTodosClientes() {
    return await ClienteRepository.findAll();
}

async function buscarClienteCpf(value) {
    return await ClienteRepository.findByPk(value);
}

async function deletarCliente(value) {
    return await ClienteRepository.destroy({ where: { cpf: value } });
}

async function salvarOuAtualizarCliente(value) {
    return await ClienteRepository.upsert(value);
}

module.exports = {inserirCliente, buscarTodosClientes, buscarClienteCpf, salvarOuAtualizarCliente, deletarCliente}

const UsuarioRepository = require('../entities/usuario');

async function inserirUsuario(value) {
    return await UsuarioRepository.create(value);
}

async function buscarTodosUsuarios() {
    return await UsuarioRepository.findAll();
}

async function buscarUsuarioCpf(value) {
    return await UsuarioRepository.findByPk(value);
}

async function deletarUsuario(value) {
    return await UsuarioRepository.destroy({ where: { cpf: value } });
}

async function salvarOuAtualizarUsuario(value) {
    return await UsuarioRepository.upsert(value);
}

module.exports = {inserirUsuario, buscarTodosUsuarios, buscarUsuarioCpf, salvarOuAtualizarUsuario, deletarUsuario}

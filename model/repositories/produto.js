const ProdutoRepository = require('../entities/produto');

async function inserirProduto(value) {
    return await ProdutoRepository.create(value);
}

async function buscarTodosProdutos() {
    return await ProdutoRepository.findAll();
}

async function buscarProdutoId(value) {
    return await ProdutoRepository.findByPk(value);
}

async function deletarProduto(value) {
    return await ProdutoRepository.destroy({ where: { id: value } });
}

async function salvarOuAtualizarProduto(value) {
    return await ProdutoRepository.upsert(value);
}

module.exports = { inserirProduto, buscarTodosProdutos, buscarProdutoId, salvarOuAtualizarProduto, deletarProduto }

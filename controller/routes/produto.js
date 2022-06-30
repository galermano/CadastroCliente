const produtoBD = require('../../model/repositories/produtoBD.js');
const seguranca = require('../../model/components/seguranca.js');

module.exports = function (app) {
    app.get("/cadastro", function (req, res) {
        if (req.query.fail)
            res.render('produto/Cadastro', { mensagem: 'Cadastro' });
        else
            res.render('produto/Cadastro', { mensagem: null });
    })

    app.post("/cadastro/produto/edit/salvar", (req, res) => {
        var produto = {
            id: req.body.id,
            nome: req.body.nome,
            quantidade: req.body.quantidade,
            preco: req.body.preco
        };

        try {
            produtoBanco.updateProduto(produto);
            res.render('produto/Sucesso', { mensagem: 'alterado' });
        } catch (error) {
            res.render('produto/EditProduto', { title: 'Edicao Cadastro', mensagem: 'Erro no cadastro' });
        }
    });

    app.post("/cadastro/produto/salvar", (req, res) => {
        try {
            var produto = {
                nome: req.body.nome,
                quantidade: req.body.quantidade,
                preco: req.body.preco
            };

            produtoBanco.insertProduto(produto);
        } catch (error) {
            console.log(error);
            res.render('produto/Cadastro', { title: 'Cadastro', mensagem: 'Erro no cadastro' });
        }
    });

    app.get("/lista/produto", function (req, res, next) {
        try {
            const docs = await produtoBanco.selectProduto();
            res.render('produto/Lista', { mensagem: 'Lista de Produtos', docs });
        } catch (err) {
            next(err);
        }
    });

    app.get("/delete/produto/:id", function (req, res, next) {
        try {
            var id = req.params.id;
            await produtoBanco.deleteProduto(id);
            const docs = await produtoBanco.selectProduto();
            res.render('produto/Lista', { mensagem: 'Produto excluido com sucesso', docs });
        } catch (err) {
            next(err);
        }
    });

    app.get("/edit/produto/:id", function (req, res, next) {
        try {
            var id = req.params.id;
            const docs = await produtoBanco.getProdutoId(id);
            res.render('produto/EditProduto', { mensagem: '', produto });
        } catch (err) {
            next(err);
        }
    });
}


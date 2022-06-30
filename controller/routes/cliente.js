const clienteBD = require('../../model/repositories/clienteBD.js');
const seguranca = require('../../model/components/seguranca.js');

module.exports = function (app) {

    app.get("/cadastro", function (req, res) {
        if (req.query.fail)
            res.render('cliente/Cadastro', { mensagem: 'Cadastro' });
        else
            res.render('cliente/Cadastro', { mensagem: null });
    })

    app.post("/cadastro/cliente/edit/salvar", (req, res) => {
        var cliente = {
            nome: req.body.nome,
            idade: req.body.idade,
            endereco: req.body.endereco,
            id: req.body.id
        };

        try {
            clienteBanco.updatecliente(cliente);
            res.render('cliente/Sucesso', { mensagem: 'alterado' });
        } catch (error) {
            res.render('cliente/Editcliente', { title: 'Edicao Cadastro', mensagem: 'Erro no cadastro' });
        }
    });

    app.post("/cadastro/cliente/salvar", (req, res) => {

            clienteBanco.insertcliente(cliente);
            console.log(error);
            res.render('cliente/Cadastro', { title: 'Cadastro', mensagem: 'Erro no cadastro' });
    });

    app.get("/lista/cliente", function (req, res, next) {
        try {
            const docs = await clienteBanco.selectcliente();
            res.render('cliente/Lista', { mensagem: 'Lista de clientes', docs });
        } catch (err) {
            next(err);
        }
    });

    app.get("/delete/cliente/:id", function (req, res, next) {
        try {
            var id = req.params.id;
            await clienteBanco.deletecliente(id);
            const docs = await clienteBanco.selectcliente();
            res.render('cliente/Lista', { mensagem: 'cliente excluido com sucesso', docs });
        } catch (err) {
            next(err);
        }
    });

    app.get("/edit/cliente/:id", function (req, res, next) {
        try {
            var id = req.params.id;
            const docs = await clienteBanco.getclienteId(id);
            res.render('cliente/Editcliente', { mensagem: '', cliente });
        } catch (err) {
            next(err);
        }
    });
}


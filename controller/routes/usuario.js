const usuarioBD = require('../../model/repositories/usuarioBD.js');
const seguranca = require('../../model/components/seguranca.js');

module.exports = function (app) {
    app.get("/login", function (req, res) {
        if (req.query.fail)
            res.render('usuario/Login', {
                mensagemLogin:
                    'Usuário e/ou senha incorretos!'
            });
        else
            res.render('usuario/Login', { mensagemLogin: null });
    })

    app.post("/login/executar", (req, res) => {
        if (req.body.nome === "escreva seu nome"
            && req.body.senha === "123456")
            res.render('lista/usuario', { mensagem: 'cadastrado' });
        else
            res.render('/login/?fail=true');
    });

    app.get("/cadastro", function (req, res) {
        if (req.query.fail)
            res.render('usuario/Cadastro', { mensagem: 'Cadastro' });
        else
            res.render('usuario/Cadastro', { mensagem: null });
    })

    app.post("/cadastro/usuario/edit/salvar", (req, res) => {
        var usuario = {
            nome: req.body.nome,
            senha: req.body.senha,
            id: req.body.id
        };

        try {
            usuarioBanco.updateUsuario(usuario);
            res.render('usuario/Sucesso', { mensagem: 'alterado' });
        } catch (error) {
            res.render('usuario/EditUsuario', { title: 'Edicao Cadastro', mensagem: 'Erro no cadastro' });
        }
    });

    app.post("/cadastro/usuario/salvar", (req, res) => {
        try {
            var usuario = {
                nome: req.body.nome,
                senha: seguranca.ocultarSenha(req.body.senha)
            };

            usuarioBanco.insertUsuario(usuario);
        } catch (error) {
            console.log(error);
            res.render('usuario/Cadastro', { title: 'Cadastro', mensagem: 'Erro no cadastro' });
        }
    });

    app.get("/lista/usuario", function (req, res, next) {
        try {
            const docs = await usuarioBanco.selectUsuario();
            res.render('usuario/Lista', { mensagem: 'Lista de Usuarios', docs });
        } catch (err) {
            next(err);
        }
    });

    app.get("/delete/usuario/:id", function (req, res, next) {
        try {
            var id = req.params.id;
            await usuarioBanco.deleteUsuario(id);
            const docs = await usuarioBanco.selectUsuario();
            res.render('usuario/Lista', { mensagem: 'Usuario excluido com sucesso', docs });
        } catch (err) {
            next(err);
        }
    });

    app.get("/edit/usuario/:id", function (req, res, next) {
        try {
            var id = req.params.id;
            const docs = await usuarioBanco.getUsuarioId(id);
            res.render('usuario/EditUsuario', { mensagem: '', usuario });
        } catch (err) {
            next(err);
        }
    });
}


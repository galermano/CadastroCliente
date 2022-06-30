const express = require("express");
const app = express();

app.get("/", function(req,resp){
resp.send("Bem-Vindo ao meu app");
})

app.get("/contato", function(req,resp){
resp.send("Pagina de contato do meu app");
})

app.get("/produto", function(req,resp){
resp.send("pagina de produto do meu app");
})
app.get("/dados/:nome/: cargo", function(req,resp){
resp.send("<hi>Ola sr(a). "+req.params.nome+"</h1><h2>Seu cargo é "+req.params.cargo+"</h2>");
})

//npm install ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')
var path = require('path');
app.set('views', path.join(__dirname, '/view/'));

//npm install consign
var consign = require('consign');
consign().include('controller/routes', ).into(app);

//npm install body-parser
bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// esta sempre deve ser a ultima linha quando usamos o express
app. listen(8081, function(){
console.log("Servidor funcionando na url http://localhost: 8081");
});


var express = require('express');
var { engine } = require('express-handlebars');
var bp = require('body-parser');
var mysql = require('mysql2');

var app = express();
var calcados = [];
var parceiros = [];

//configurções para identificar framework que fará rendeirizações
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
//configuração do body-parser para informar que os dados virão com json
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json());

//configurações para se conectar ao banco de dados
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'venha2021',
    database: 'calce_me'
});

app.get('/', function (request, response) {
    // sql é uma string, porém ela contém um script do banco para ser executado através da conexão
    sql = 'SELECT * FROM calcados';
    mysqlConnection.query(sql, function (err, resultSet, fields) {
        if (err) {
            console.log('Erro ao consultar os dados no banco: ', err);
        } else {
            response.render('index', { calcados: resultSet });
        }
    })
});

app.get('/parceiros', function (request, response) {
    // sql é uma string, porém ela contém um script do banco para ser executado através da conexão
    sql = 'SELECT * FROM parceiros';
    mysqlConnection.query(sql, function (err, resultSet, fields) {
        if (err) {
            console.log('Erro ao consultar os dados no banco: ', err);
        } else {
            response.render('parceiros', { parceiros: resultSet });
        }
    })
});

app.get('/cadastroCalcado', function (request, response) {
    response.render('cadastroCalcado');
});

app.get('/descricao', function (request, response) {
    response.render('descricao');
});

app.get('/parceiros', function (request, response) {
    response.render('parceiros');
});

app.get('/cadastroParceiro', function (request, response) {
    response.render('cadastroParceiro');
});


app.post('/cadastroCalcado', function (request, response) {
    modelo = request.body.modelo;
    cor = request.body.cor;
    descricao = request.body.descricao;
    material = request.body.material;
    valor = request.body.valor;

    console.log("Modelo: " + modelo);
    console.log("Cor: " + cor);
    console.log("Descrição: " + descricao);
    console.log("Material: " + material);
    console.log("Valor: " + valor);
    // DESNECESSÁRIO QUANDO USA O BANCO
    calcado = {
        "modelo": modelo,
        "cor": cor,
        "descricao": descricao,
        "material": material,
        "valor": valor
    };
    // dados que vão para o banco no lugar da interrogação
    values = [[modelo, cor, descricao, material, valor]];
    calcados.push(calcado);
    sql = 'INSERT INTO calcados (modelo, cor, descricao, material, valor) VALUES ?';
    mysqlConnection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Linhas modificadas no banco: ", result.affectedRows);
    })
    response.redirect('/');
})

app.post('/cadastroParceiro', function (request, response) {
    nome = request.body.nome;
    tempoParceria = request.body.tempoParceria;
    linkContato = request.body.linkContato;
    if (tempoParceria >= 1) {
        console.log("Nome: " + nome);
        console.log("Tempo de parceria: " + tempoParceria);
        console.log("Link para contato: " + linkContato);

        // DESNECESSÁRIO QUANDO USA O BANCO
        parceiro = {
            "nome": nome,
            "tempoParceria": tempoParceria,
            "linkContato": linkContato

        };
        // dados que vão para o banco no lugar da interrogação
        values = [[nome, tempoParceria, linkContato]];
        parceiros.push(parceiro);
        sql = 'INSERT INTO parceiros (nome, tempoParceria, linkContato) VALUES ?';
        mysqlConnection.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Linhas modificadas no banco: ", result.affectedRows);
        })
        response.redirect('/parceiros');
    }else{
        response.redirect('/parceiros');
    }
    


})

app.listen(3000);
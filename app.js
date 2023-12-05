const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

//Configurando MYSQL

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bb;271014',
    database: 'biblioteca'
});

//Conectar MYSQL

db.connect((err) => {
    if(err) {
        console.error('Erro ao conectar ao MySQL: ' + err.stack);
        return;
    }
    console.log('Conectado ao MySQL como ID ' + db.threadId);
});

//Configurando o Body Parser

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

//Configurando rotas

app.get('/', (req, res) => {
    res.send('Bem vindo à Biblioteca Virtual!');
});

//Consulta (READ)
app.get('/funcionarios', (req, res) => {
    db.query('SELECT* FROM funcionarios', (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

//Adição (CREATE)
app.post('/funcionarios', (req,res) => {
    const {nome, genero } = req.body;
    db.query('INSERT INTO funcionarios (nome, genero) VALUES (?,?)', [nome, genero], (err, result)=> {
        if(err) throw err;
        res.send('Funcionário adicionado com sucesso!');
    });
});

//Modificação (UPDATE)
app.put('/funcionarios', (req, res) => {
    const {nome, genero} = req.body;
    const id = req.params.id;
    db.query('UPDADE funcionarios SET nome = ?, genero = ? WHERE id = ?', [nome, genero, id], (err, result) => {
        if (err) throw err;
        res.send('Funcionário alterado com sucesso!');
    });
});

//Apagamento (DELETE)
app.delete('/funcionarios', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM funcionarios WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.send('Funcionário deletado com sucesso');
    });
});

//Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
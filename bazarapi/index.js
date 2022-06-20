const express = require('express');
const cors = require('cors');
const app = express();

app.use('*', cors());
app.use(express.json());

const Produto = require('./models/produtos');//Esse comando irá criar a tabela

app.get("/", async (req, res) => {
    res.send('Inicial!');
})

app.post("/cadastrar", async (req, res) => {

    await Produto.create(req.body)
        .then(() => {
            return res.status(200).json({
                erro: false,
                mensagem: "Registro inserido!"
            });
        }).catch((erro) => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro ao inserir!" + erro 
            });
        });
});

app.get("/listar", async (req, res) => {
    await Produto.findAll({}).then((register) => {
        return res.json(register)
    })
        .then(() => {
            return res.status(200).json({
                erro: false,
                mensagem: "Registro inserido!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro ao inserir!"
            });
        });
});

app.delete("/deletar/:id", async (req, res) => {
    const _id = req.params.id
    console.log("req.params: " + _id)
    await Produto.destroy({
        where: { id: _id }

        }).then(() => {
            return res.status(200).json({
                erro: false,
                mensagem: "Registro deletado!"
            });
        }).catch((error) => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro ao deletar! " + error
        });
    });
});

app.listen(8080, () => {
    console.log('Server start...');
})
const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3600;

let alunos = [
    {
        id: 1,
        nome: "Pedro",
        email: "pedro@gmail.com",
        turma: "TDS2026"

    },
    {
        id: 2,
        nome: "Ana",
        email: "ana@gmail.com",
        turma: "TDS2026"
    }
];

//GET listar tudo

app.get("/alunos", (req, res) => {
    res.status(200).json(alunos);
});

//get consultar pelo id

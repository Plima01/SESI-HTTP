const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3000;

let alunos = [
    {
        id: 1, 
        nome: "Ana", 
        email: "ana@email.com",
        turma: "TDS2026"
    },
    {
        id: 2,
        nome: "Pedro",
        email: "pedro@email.com",
        turma: "TDS2026"
    }
];

// GET - Listar todos os alunos
app.get("/alunos", (req, res) => {
    res.status(200).json(alunos);
});

// GET - Consultar aluno pelo id
app.get("/alunos/:id", (req, res) => {
    const id = Number(req.params.id);

    const aluno = alunos.find(a => a.id === id);

    if (!aluno){
        return res.status(404).json({
            mensagem: "Aluno não encontrado."
        });
    }
    res.status(200).json(aluno);
})

// POST - Cadastrar aluno
app.post("/alunos", (req, res) => {
    const { nome, email, turma } = req.body;

    if(!nome || !email || !turma) {
        return res.status(400).json({
            mensagem: "Informe nome, email e turma"
        });
    }

    const novoAluno = {
        // operador ternário
        id: alunos.length ? Math.max(...alunos.map(a => a.id)) + 1 : 1,
        nome,
        email,
        turma
    };

    alunos.push(novoAluno);
    res.status(200).json(novoAluno);
});

// PUT - Atualizar aluno
app.put("/aluno/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = alunos.findIndex(a => a.id === id);

    if(indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"         
        });
    }

    const { nome, email, turma } = req.body;

    if(!nome || !email || !turma) {
        return res.status(400).json({
            mensagem: "Informe nome, email e turma"
        });
    }

    alunos[indice] = {
        id,
        nome,
        email,
        turma
    };

    res.status(200).json(alunos[indice]);
});

// DELETE - Excluir aluno
app.delete("/aluno/:id", (req, res) => {
    const id = Number(req.params.id);

    const existe = alunos.some(a => a.id === id);

    if(!existe) {
        res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    alunos = alunos.filter(a => a.id !== id);
    res.status(204).send();
});

// PATCH /alunos/:id — editar aluno
app.patch('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id);
  
    // Validate ID
    if (isNaN(id)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }
  
    const index = alunos.findIndex(a => a.id === id);
  
    if (index === -1) {
      return res.status(404).json({ erro: `Aluno com ID ${id} não encontrado` });
    }
  
    // Allowed fields only — ignore anything else sent in the body
    const { nome, email, turma } = req.body;
    const updates = {};
  
    if (nome  !== undefined) updates.nome  = nome;
    if (email !== undefined) updates.email = email;
    if (turma !== undefined) updates.turma = turma;
  
    // Nothing valid was sent
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ erro: 'Nenhum campo válido enviado para atualização' });
    }
  
    alunos[index] = { ...alunos[index], ...updates };
  
    res.status(200).json({
      mensagem: 'Aluno atualizado com sucesso',
      aluno: alunos[index]
    });
  });
  
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`API executando em http://localhost:${PORT}`);
});
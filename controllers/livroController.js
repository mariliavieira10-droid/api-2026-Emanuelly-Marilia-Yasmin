const livros = [
    {
        id: 1,
        titulo: 'Dom Casmurro',
        autor: 'Machado de Assis',
        preco: 39.90
    },
    {
        id: 2,
        titulo: 'Harry Potter e a Pedra Filosofal',
        autor: 'J. K. Rowling',
        preco: 49.90
    },
    {
        id: 3,
        titulo: '1984',
        autor: 'George Orwell',
        preco: 42.90
    }
];

function listar(req, res) {
    res.json(livros);
}

function buscarPorId(req, res) {
    const id = Number(req.params.id);
    const livro = livros.find(item => item.id === id);

    if (!livro) {
        return res.status(404).json({
            erro: 'Livro não encontrado'
        });
    }

    res.json(livro);
}

function criar(req, res) {
    const { titulo, autor, preco } = req.body;

    if (
        typeof titulo !== 'string' || !titulo.trim() ||
        typeof autor !== 'string' || !autor.trim() ||
        !Number.isFinite(Number(preco)) || Number(preco) < 0
    ) {
        return res.status(400).json({
            erro: 'Informe título, autor e preço válidos.'
        });
    }

    const novoLivro = {
        id: Math.max(0, ...livros.map(item => item.id)) + 1,
        titulo: titulo.trim(),
        autor: autor.trim(),
        preco: Number(preco)
    };

    livros.push(novoLivro);

    res.status(201).json(novoLivro);
}

function atualizar(req, res) {
    const livro = livros.find(
        item => item.id === Number(req.params.id)
    );

    if (!livro) {
        return res.status(404).json({
            erro: 'Livro não encontrado'
        });
    }

    const { titulo, autor, preco } = req.body;

    if (
        typeof titulo !== 'string' || !titulo.trim() ||
        typeof autor !== 'string' || !autor.trim() ||
        !Number.isFinite(Number(preco)) || Number(preco) < 0
    ) {
        return res.status(400).json({
            erro: 'Informe título, autor e preço válidos.'
        });
    }

    livro.titulo = titulo.trim();
    livro.autor = autor.trim();
    livro.preco = Number(preco);

    res.json(livro);
}

function excluir(req, res) {
    const indice = livros.findIndex(
        item => item.id === Number(req.params.id)
    );

    if (indice === -1) {
        return res.status(404).json({
            erro: 'Livro não encontrado'
        });
    }

    livros.splice(indice, 1);

    res.json({ mensagem: 'Livro excluído com sucesso' });
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir,
    listarParaPagina
};
function listarParaPagina() {
    return livros;
}
const clientes = [
    {
        id: 1,
        nome: 'Ana Beatriz Lima',
        email: 'ana@email.com'
    },
    {
        id: 2,
        nome: 'Bruno Santos',
        email: 'bruno@email.com'
    }
];

function listar(req, res) {
    res.json(clientes);
}

function buscarPorId(req, res) {
    const cliente = clientes.find(
        item => item.id === Number(req.params.id)
    );

    if (!cliente) {
        return res.status(404).json({
            erro: 'Cliente não encontrado'
        });
    }

    res.json(cliente);
}

module.exports = {
    listar,
    buscarPorId
};
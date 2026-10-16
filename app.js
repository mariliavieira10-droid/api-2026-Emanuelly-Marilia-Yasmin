
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const logger = require('./middlewares/logger');
const livroRoutes = require('./routes/livroRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const livroController = require('./controllers/livroController');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

// Rotas da API REST
app.use('/api/livros', livroRoutes);
app.use('/api/clientes', clienteRoutes);

// Página inicial
app.get('/', (req, res) => {
    res.render('home', { titulo: 'Início' });
});

// Página de livros
app.get('/livros', (req, res) => {
    const livros = livroController.listarParaPagina
        ? livroController.listarParaPagina()
        : [];

    res.render('livros', { titulo: 'Livros', livros });
});

// Tratamento de rotas inexistentes
app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({
            erro: 'Endpoint não encontrado'
        });
    }

    res.status(404).send('Página não encontrada');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
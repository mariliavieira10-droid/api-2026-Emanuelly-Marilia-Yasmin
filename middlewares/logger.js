function logger(req, res, next) {
    console.log(
        `${new Date().toLocaleString('pt-BR')} - ${req.method} ${req.url}`
    );

    next();
}

module.exports = logger;
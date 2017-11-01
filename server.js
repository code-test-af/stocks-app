const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const companiesApi = require('./api/companies');
const stockInfoApi = require('./api/stock-info');
const newsApi = require('./api/news');

app.prepare().then(() => {
    const server = express();

    server.get('/api/companies', (req, res) => {
        return companiesApi.handle(req, res);
    });

    server.get('/api/stock-info/:company', (req, res) => {
        return stockInfoApi.handle(req, res);
    });

    server.get('/api/news/:id', (req, res) => {
        return newsApi.handle(req, res);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err
    });

});

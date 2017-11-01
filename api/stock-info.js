const fetch = require('isomorphic-fetch');
const config = require('../config');

class StockInfoApi {
    handle(req, res) {
        this.fetchStockInfo(req.params.company).then((stockInfo) => {
            res.json(stockInfo);
        });

    }

    fetchStockInfo(company) {
        return fetch(`${config.companyStockBaseUrl}/${company}`)
            .then((response) => response.json());
    }
}

module.exports = new StockInfoApi();

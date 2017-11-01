const fetch = require('isomorphic-fetch');
const config = require('../config');

class StockInfoApi {
    handle(req, res) {
        this.fetchStockInfo(req.params.company).then((stockInfo) => {
            res.json(stockInfo);
        }).catch((error) => {
            res.status(500).send(error);
        });

    }

    fetchStockInfo(company) {
        return fetch(`${config.companyStockBaseUrl}/${company}`)
            .then((response) => {
                if (!response.ok) {
                    throw {'message': 'Stock API returned an invalid response'};
                }
                return response.json()
            });
    }
}

module.exports = new StockInfoApi();

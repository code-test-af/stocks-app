const fetch = require('isomorphic-fetch');
const config = require('../config');

class NewsApi {
    handle(req, res) {
        this.fetchNews(req.params.id).then((news) => {
            res.json(news);
        }).catch((error) => {
            res.status(500).send(error);
        });
    }

    fetchNews(newsId) {
        return fetch(`${config.newsBaseUrl}/${newsId}`)
            .then((response) => {
                if (!response.ok) {
                    throw {'message': 'News API returned an invalid response'};
                }
                return response.json()
            });
    }
}

module.exports = new NewsApi();

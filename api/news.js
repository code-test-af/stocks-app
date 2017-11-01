const fetch = require('isomorphic-fetch');
const config = require('../config');

class NewsApi {
    handle(req, res) {
        this.fetchNews(req.params.id).then((news) => {
            res.json(news);
        });
    }

    fetchNews(newsId) {
        return fetch(`${config.newsBaseUrl}/${newsId}`)
            .then((response) => response.json());
    }
}

module.exports = new NewsApi();

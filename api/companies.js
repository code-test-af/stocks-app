const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

class CompaniesApi {
    handle(req, res) {
        this.getCompaniesList().then((companiesList) => {
            res.json(companiesList);
        });
    }

    getCompaniesList() {
        return this.fetchCompaniesFromDb().then(this.formatCompaniesList);
    }

    formatCompaniesList(companies) {
        return companies.map((company) => {
            return {
                name: company.name,
                tickerCode: company.tickerCode
            };
        });
    }

    fetchCompaniesFromDb() {
        return MongoClient.connect(config.mongoDbUrl).then((db) => {
            const companiesCollection = db.collection('company');
            return companiesCollection.find({}).toArray().then((companies) => {
                db.close();
                return companies;
            });
        });
    }
}

module.exports = new CompaniesApi();

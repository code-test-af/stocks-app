import companiesApi from '../../api/companies'

describe('#handle(req, res)', () => {
    it('should exist', () => {
        expect(companiesApi.handle).toBeDefined();
    });
});

describe('#formatCompaniesList(companies)', () => {
    it('should return a list of companies it is passed', () => {
        const commpaniesToFormat = [
            {'name':'Google Inc', 'tickerCode': 'GOOG'},
            {'name': 'Apple Inc', 'tickerCode': 'AAPL'}
        ];

        const expectedFormatedList = [
            {'name':'Google Inc', 'tickerCode': 'GOOG'},
            {'name': 'Apple Inc', 'tickerCode': 'AAPL'}
        ];

        const received = companiesApi.formatCompaniesList(commpaniesToFormat);
        expect(received).toEqual(expectedFormatedList);
    });

    it('should format the list to only include tickerCode and name values', () => {
        const companiesWithExtaData = [
            {'name':'Google Inc', 'tickerCode': 'GOOG', 'extraValue': 'REMOVE_ME'},
            {'name': 'Apple Inc', 'tickerCode': 'AAPL', '_id': 1231323}
        ];

        const expectedFormatedList = [
            {'name':'Google Inc', 'tickerCode': 'GOOG'},
            {'name': 'Apple Inc', 'tickerCode': 'AAPL'}
        ];

        const received = companiesApi.formatCompaniesList(companiesWithExtaData);
        expect(received).toEqual(expectedFormatedList);
    });
});

describe('#getCompaniesList()', () => {
    it('should return a list of formatted companies from the db', () => {
        /* Mock the db fetch method */
        companiesApi.fetchCompaniesFromDb = jest.fn(() =>{
            return Promise.resolve([
                {'_id': '5549f199720221d21b03cb23', 'name': 'Microsoft Inc', 'tickerCode': 'MSFT'},
                {'_id': '5549f1a4720221d21b03cb24', 'name': 'Google Inc', 'tickerCode': 'GOOG'},
                {'_id': '5549f1ad720221d21b03cb25', 'name': 'Apple Inc', 'tickerCode': 'AAPL'}
            ]);
        });

        const expectedCompanies = [
            {'name': 'Microsoft Inc', 'tickerCode': 'MSFT'},
            {'name': 'Google Inc', 'tickerCode': 'GOOG'},
            {'name': 'Apple Inc', 'tickerCode': 'AAPL'}
        ];

        return companiesApi.getCompaniesList().then(companies => {
            expect(companies).toEqual(expectedCompanies);
            expect(companiesApi.fetchCompaniesFromDb.mock.calls.length).toBe(1);
        });
    });
});


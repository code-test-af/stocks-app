import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import Link from 'next/link';
import config from '../config';
import Page from '../components/page';

class IndexPage extends React.Component {
    static async getInitialProps() {
        const res = await fetch(`${config.apiBaseUrl}/api/companies`);
        return { companies: await res.json() }
    }

    renderCompnay(company) {
        return (
            <li key={company.tickerCode} className="company-item">
                <Link href={{ pathname: '/company', query: { ticker: company.tickerCode, name: company.name } }}>
                    <a>{company.name}</a>
                </Link>
            </li>
        );
    }

    render() {
        return (
            <Page>
                <h1>Stocks App</h1>
                <h2>Choose a company to explore</h2>
                <ul className="companies-list">
                    {this.props.companies.map(this.renderCompnay)}
                </ul>
                {this.styles()}
            </Page>
        );
    }

    styles() {
        return (
            <style jsx="true">
                {`
                    .companies-list {
                        display: flex;
                        flex-wrap: wrap;
                        list-style: none;
                        padding: 0;
                    }
                    .company-item {
                        flex: 0 1 100%;
                        border: .2em solid #414141;
                    }
                    @media (min-width: 540px) {
                        .company-item {
                            flex-basis: 50%;
                        }
                    }

                    .company-item a {
                        background-color: #FF6A5C;
                        display: block;
                        width: 100%;
                        padding: .8em;
                        color: #fff;
                        font-size: 1.2em;
                        text-align: center;
                        text-decoration: none;
                        font-weight: bold;
                    }

                    .company-item a:hover, .company-item a:focus{
                        background-color: rgba(253, 107, 96, 0.8);
                    }
                    .company-item a:active{
                        background-color: rgba(253, 107, 96, 0.6);
                    }
                `}
            </style>
        );
    }
}

IndexPage.propTypes = {
    companies: PropTypes.array
};

export default IndexPage;

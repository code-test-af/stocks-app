import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/page';
import fetch from 'isomorphic-fetch'
import config from '../config';

const getNewsIdFromStoryUrl = ((storyUrl) => {
    return storyUrl.split('/').pop();
});

class CompanyPage extends React.Component {
    static async getInitialProps({ query }) {
        const stockInfoResponse = await fetch(`${config.apiBaseUrl}/api/stock-info/${query.ticker}`);
        const stockInfo = await stockInfoResponse.json();

        const newsId = getNewsIdFromStoryUrl(stockInfo.storyFeedUrl);
        const newsFeedResponse = await fetch(`${config.apiBaseUrl}/api/news/${newsId}`);
        const newsFeed = await newsFeedResponse.json();
        return { newsFeed, stockInfo, name: query.name };
    }

    render() {
        return (
            <Page>
                <h1>Stocks App</h1>
                <h2>{this.props.name}</h2>
                <p>{this.props.stockInfo.tickerCode} - {this.props.stockInfo.latestPrice}p</p>

                {this.renderNews()}

                {this.styles()}
            </Page>
        );
    }

    renderNews() {
        console.log(this.props.newsFeed);
        return (
            <ul>
                {this.props.newsFeed.map((story) => {
                    return (
                        <li key={story.id}>
                            {story.headline}
                        </li>
                    );
                })}
            </ul>
        );
    }


    styles() {
        return (
            <style jsx="true">{`
                    p {
                        color: #fff;
                    }
            `}</style>
        );
    }
}

//CompanyPage.propTypes = {
    //company: PropTypes.string
//};

export default CompanyPage;

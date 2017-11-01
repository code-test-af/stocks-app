import React from 'react';
import Link from 'next/link';
import Page from '../components/page';
import fetch from 'isomorphic-fetch'
import config from '../config';
import sentiment from '../lib/sentiment';
import SentimentEmoji from '../components/sentiment-emoji';

const getNewsIdFromStoryUrl = ((storyUrl) => {
    return storyUrl.split('/').pop();
});

class CompanyPage extends React.Component {
    static async getInitialProps({ query }) {
        try {
            const stockInfoResponse = await fetch(`${config.apiBaseUrl}/api/stock-info/${query.ticker}`);
            if (!stockInfoResponse.ok) throw {'message': 'Error fetching stock info'};
            const stockInfo = await stockInfoResponse.json();

            let newsFeed;
            if (stockInfo.storyFeedUrl) {
                const newsId = getNewsIdFromStoryUrl(stockInfo.storyFeedUrl);
                const newsFeedResponse = await fetch(`${config.apiBaseUrl}/api/news/${newsId}`);
                if (newsFeedResponse.ok) {
                    newsFeed = await newsFeedResponse.json();
                }
            }
            return { newsFeed, stockInfo, name: query.name };
        } catch (error) {
            return {};
        }
    }

    render() {
        if (!this.props.stockInfo) {
            return this.renderErrorDisplay();
        }

        return (
            <Page>
                <h1>Stocks App</h1>
                {this.renderBackLink()}
                <div className="company-card">
                    <h2>{this.props.name} - {this.props.stockInfo.tickerCode}</h2>
                    <p>{this.props.stockInfo.latestPrice}p</p>

                    {this.props.newsFeed && this.renderNews()}
                </div>

                {this.styles()}
            </Page>
        );
    }

    renderNews() {
        return (
            <div>
                <h3>Latest news stories</h3>
                <ul className="news-list">
                    {this.props.newsFeed.map((story) => {
                        const sentimentValue = sentiment.calculateSentiment(story.body);
                        return (
                            <li key={story.id}>
                                <span>{story.headline}</span>
                                <SentimentEmoji sentiment={sentimentValue} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    renderBackLink() {
        return (
            <Link href="/">
                <a className="back-link">Back to companies list</a>
            </Link>
        )
    }

    renderErrorDisplay() {
        return (
            <Page>
                <h1>Something went wrong</h1>
                <p>
                    Sorry, we are unable to fetch the company you requested.
                </p>
                {this.renderBackLink()}

                {this.styles()}
            </Page>
        );
    }

    styles() {
        return (
            <style jsx="true">{`
                    h2, h3 {
                        color: #21224e;
                        margin: .2em 0;
                    }
                    .company-card {
                        display: inline-block;
                        padding: 1em;
                        background-color: #FF6A5C;
                    }
                    .news-list {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }
                    .back-link {
                        display: block;
                        color: #fff;
                        margin: 1em 0;
                    }
                    .back-link:hover, back-link:focus{
                        color: rgba(255,255,255,0.7);
                    }
            `}</style>
        );
    }
}

export default CompanyPage;

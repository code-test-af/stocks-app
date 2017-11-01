# Stocks app
> Explore the stock and sentiments for companies

## Building and starting the app
You can build the app by running the following commands. You can then view the app at [http://localhost:3000](http://localhost:3000)

```
npm install
npm run build
npm start
```

## Running the tests
Running the following command to run the ESlinter and Jest test.

```
npm run lint
npm test
```

## Developing
To develop new features for the app you can start the dev server, which will enable live reloading as you save.

```
npm run dev
```

## Technologies used
* React
* NextJs - To allow both client and server side rendering of react components (Isomorphic)
* Express - HTTP server with routing
* MongoDB - Fetching company list
* Eslint - JS linting

## Gotchas
I originally tried to fetch the news feed and stock information directly from the APIs. This worked fine when the page was rendered on the server, but when it tried to fetch it on the client I got a CORS error due to the server not sending an `Access-Control-Allow-Origin` header.

To fix this I added two extra endpoints to the API (`/api/companies/` and `/api/stock-info`), which proxied the request to the real server. This solved the issue as the API was accessible to the client.

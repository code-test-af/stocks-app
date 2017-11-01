import React from 'react';
import Head from 'next/head';

export default () => (
    <div>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
        </Head>
        <style jsx global>
            {`
                html {
                    box-sizing: border-box;
                }

                *, *:before, *:after {
                    box-sizing: inherit;
                }

                body {
                    background: #414141;
                    font-family: Helvetica, Arial, freesans, sans-serif;
                    color: #fff;
                }
            `}
        </style>
    </div>
);

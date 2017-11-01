import React from 'react';
import Meta from './meta'

export default ({ children }) => (
    <div className="page">
        <style jsx>
            {`
                .page {
                    max-width: 764px;
                    margin: auto;
                }
            `}
        </style>
        <Meta />
        {children}
    </div>
);

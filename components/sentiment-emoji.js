import React from 'react';

const getEmojiFromSentiment = ((sentiment) => {
    switch(sentiment) {
    case 'positive':
        return '😃';
    case 'neutral':
        return '😐';
    case 'negative':
        return '☹️';
    }
})

export default ({ sentiment }) => (
    <span className="emoji">
        {getEmojiFromSentiment(sentiment)}

        <style jsx="true">
            {`
                .emoji {
                    font-size: 1.5em;
                    padding: 0.2em;
                }
            `}
        </style>
    </span>
);

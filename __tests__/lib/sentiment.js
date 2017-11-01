import sentiment from '../../lib/sentiment'

describe('Sentiment Analyser', () => {
    describe('calculatePositivity(body)', () => {
        it('should return the number of positive words when only positive words appear', () => {
            const allPostiveWordsExample = 'This only contains positive words like positive, gains and happy.';
            expect(sentiment.calculatePositivity(allPostiveWordsExample)).toBe(4);
        });

        it('should match positive words case-insensitively', () => {
            const caseInsensitiveExample = 'This only contains PoSitive words like positive, GAINS and Happy.';
            expect(sentiment.calculatePositivity(caseInsensitiveExample)).toBe(4);
        });

        it('should return the minus number of negative words when only negative words appear', () => {
            const allNegativeWordsExample = 'Disappointing this only contains negative words like: concerns, decline, drag and slump.';
            expect(sentiment.calculatePositivity(allNegativeWordsExample)).toBe(-5);
        });

        it('should match negative words case-insensitively', () => {
            const caseExample = 'Decline should be FEARED - Slump';
            expect(sentiment.calculatePositivity(caseExample)).toBe(-3);
        });

        it('should return the number of postive minus the number of negative words when both appear', () => {
            const mixtureExample = 'The positive gains outway the disappointing decline, so you should be happy.';
            expect(sentiment.calculatePositivity(mixtureExample)).toBe(1);
        });
    });

    describe('calculateSentiment(body)', () => {
        it('should return neutral if the positivity is less than 2', () => {
            const neutralExample = 'The positive gains outway the disappointing decline, so you should be happy.';
            expect(sentiment.calculateSentiment(neutralExample)).toBe('neutral');
        });

        it('should return positive if the positivity is 2 or more', () => {
            const positiveExample = 'Gains, positive, GAINS and happy.';
            expect(sentiment.calculateSentiment(positiveExample)).toBe('positive');
        });

        it('should return negative if the positivity is negative', () => {
            const positiveExample = 'Decline feared SLUMP not happy disappointing';
            expect(sentiment.calculateSentiment(positiveExample)).toBe('negative');
        });
    });
});


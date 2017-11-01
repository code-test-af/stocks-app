const positiveWords = ['positive', 'success', 'grow', 'gains', 'happy', 'healthy'];
const negativeWords = ['disappointing', 'concerns', 'decline', 'drag', 'slump', 'feared'];

class Sentiment {
    calculateSentiment(body) {
        const positivity = this.calculatePositivity(body);
        if (positivity >= 2) {
            return 'positive';
        }
        else if (positivity >= 0) {
            return 'neutral';
        }
        return 'negative';
    }

    calculatePositivity(body) {
        const words = body.split(/\W+/);
        return words.reduce((positivity, word) => {
            if (positiveWords.includes(word.toLowerCase())) {
                positivity++;
            }
            else if (negativeWords.includes(word.toLowerCase())) {
                positivity--;
            }
            return positivity;
        }, 0);
    }
}

module.exports = new Sentiment();

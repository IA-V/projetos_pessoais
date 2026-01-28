const crypto = require('crypto');

const shortenUrl = (originalUrl: string): string => {
    const urlHash = crypto.createHash('md5').update(originalUrl).digest('hex');

    const shortHash = urlHash.slice(0, 6);

    return `localhost:4000//bit.ly/${shortHash}`; // TODO - bitly url must be dynamic (localhost or production)
}

export { shortenUrl };
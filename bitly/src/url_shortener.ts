import crypto from 'crypto';

const shortenUrl = (originalUrl: string, alias: string | null): string => {
    if (alias) {
        return `localhost:4000/urls/${alias}`;
    } else {
        const urlHash = crypto.createHash('md5').update(originalUrl).digest('hex');
        const shortHash = urlHash.slice(0, 6);
    
        return `localhost:4000/urls/${shortHash}`; // TODO - bitly url must be dynamic (localhost or production)
    }
}

export { shortenUrl };
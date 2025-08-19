import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const response = await axios.get('http://quotes.toscrape.com/');
    const $ = cheerio.load(response.data);

    const quotes = [];
    $('.quote').each((i, el) => {
      const text = $(el).find('.text').text();
      const author = $(el).find('.author').text();
      quotes.push({ text, author });
    });

    res.status(200).json(quotes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error scraping site' });
  }
}

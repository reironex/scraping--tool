import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Example: kunin lahat ng <p> text sa page
    const paragraphs = [];
    $('p').each((i, el) => {
      paragraphs.push($(el).text());
    });

    res.status(200).json({ paragraphs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error scraping site' });
  }
}

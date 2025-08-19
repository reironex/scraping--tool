import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const headings = [];
    const paragraphs = [];
    const links = [];

    $('h1,h2,h3').each((i, el) => headings.push($(el).text()));
    $('p').each((i, el) => paragraphs.push($(el).text()));
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href) links.push({ text: $(el).text(), href });
    });

    res.status(200).json({ headings, paragraphs, links });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error scraping the site' });
  }
}

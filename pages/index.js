import { useState } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';

export default function Home({ initialData }) {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(initialData || { headings: [], paragraphs: [], links: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const scrape = async () => {
    if (!url) return setError('Please enter a URL');
    setError('');
    setData({ headings: [], paragraphs: [], links: [] });
    setLoading(true);

    try {
      // Serverless scraping via internal API route (client fetch)
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      const json = await res.json();
      if (json.error) setError(json.error);
      else setData(json);
    } catch (err) {
      console.error(err);
      setError('Failed to scrape website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '30px', background: '#fdf0ff' }}>
      <h1 style={{ color: '#d633ff' }}>Single-File HTML Scraper</h1>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{ width: '60%', padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #d633ff' }}
      />
      <button
        onClick={scrape}
        style={{ padding: '10px 20px', background: '#d633ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {loading ? 'Scraping...' : 'Scrape'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <div style={{ marginTop: '20px' }}>
        {data.headings.length > 0 && (
          <>
            <h2 style={{ color: '#a200ff' }}>Headings</h2>
            <ul>{data.headings.map((h, i) => <li key={i} style={{ background: '#ffe6ff', margin: '5px 0', padding: '8px', borderRadius: '5px' }}>{h}</li>)}</ul>
          </>
        )}
        {data.paragraphs.length > 0 && (
          <>
            <h2 style={{ color: '#a200ff' }}>Paragraphs</h2>
            <ul>{data.paragraphs.map((p, i) => <li key={i} style={{ background: '#ffe6ff', margin: '5px 0', padding: '8px', borderRadius: '5px' }}>{p}</li>)}</ul>
          </>
        )}
        {data.links.length > 0 && (
          <>
            <h2 style={{ color: '#a200ff' }}>Links</h2>
            <ul>{data.links.map((l, i) => <li key={i} style={{ background: '#ffe6ff', margin: '5px 0', padding: '8px', borderRadius: '5px' }}><a href={l.href} target="_blank" rel="noopener noreferrer" style={{ color: '#d633ff' }}>{l.text || l.href}</a></li>)}</ul>
          </>
        )}
      </div>
    </div>
  );
          }

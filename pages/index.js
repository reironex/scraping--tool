import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const scrape = async () => {
    if (!url) return setError('Please enter a URL');
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResults(data.paragraphs || []);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to scrape');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '30px', background: '#fdf0ff' }}>
      <h1 style={{ color: '#d633ff' }}>Web Scraper Tool</h1>
      <input
        type="text"
        placeholder="Enter URL to scrape"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '60%', padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #d633ff' }}
      />
      <button
        onClick={scrape}
        style={{ padding: '10px 20px', background: '#d633ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {loading ? 'Scraping...' : 'Scrape'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
        {results.map((p, i) => (
          <li key={i} style={{ background: '#ffe6ff', margin: '5px 0', padding: '10px', borderRadius: '5px' }}>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from 'react';

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrapeQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/scrape');
      const data = await res.json();
      setQuotes(data);
    } catch (err) {
      console.error(err);
      alert('Error scraping data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', background: '#fdf0ff' }}>
      <h1 style={{ color: '#d633ff' }}>Quotes Scraper</h1>
      <button 
        onClick={scrapeQuotes} 
        style={{ padding: '10px 20px', background: '#d633ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {loading ? 'Loading...' : 'Scrape Quotes'}
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {quotes.map((q, i) => (
          <li key={i} style={{ background: '#ffe6ff', margin: '5px 0', padding: '10px', borderRadius: '5px' }}>
            {q.text} — {q.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

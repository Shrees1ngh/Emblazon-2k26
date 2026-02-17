import { Link } from 'react-router-dom';

export default function Gallery() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <h1>Gallery</h1>
      <Link to="/" style={{ color: '#db6613' }}>← Back to Home</Link>
    </div>
  );
}

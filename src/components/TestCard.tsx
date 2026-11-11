import { ArrowUpRight, Clock3, Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { DiagnosticTest } from '../types';

export default function TestCard({ test }: { test: DiagnosticTest }) {
  return <article className="test-card">
    <div className="test-icon"><Droplet size={21}/></div>
    <div className="test-card-top"><span className="category-label">{test.category}</span>{test.popular && <span className="popular-label">Popular</span>}</div>
    <h3>{test.name}</h3><p>{test.description}</p>
    <div className="test-meta"><span><Clock3 size={14}/> {test.reportTime}</span><span>{test.sample} sample</span></div>
    <div className="test-card-bottom"><div><small>Starting from</small><strong>₹{test.price || '—'}</strong></div><Link to={`/test/${test.slug}`} aria-label={`View ${test.name}`} className="round-link"><ArrowUpRight size={18}/></Link></div>
  </article>;
}

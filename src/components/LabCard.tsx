import { ArrowRight, CheckCircle2, MapPin, Star } from 'lucide-react';
import type { Lab } from '../types';

export default function LabCard({ lab, onBook }: { lab: Lab; onBook: (lab: Lab) => void }) {
  return <article className="lab-card">
    <div className="lab-logo" style={{ background: lab.accent }}><span>{lab.name.split(' ').map(word => word[0]).slice(0, 2).join('')}</span></div>
    <div className="lab-main">
      <div className="lab-heading"><div><h3>{lab.name}</h3><div className="rating"><Star size={14} fill="currentColor"/> {lab.rating.toFixed(1)} <span>({lab.reviews.toLocaleString()} reviews)</span></div></div><span className="distance"><MapPin size={13}/> {lab.distance}</span></div>
      <div className="tag-row">{lab.tags.map(tag => <span key={tag}><CheckCircle2 size={12}/>{tag}</span>)}</div>
      <div className="availability">{lab.availability}</div>
    </div>
    <div className="lab-price"><small>Test price</small><strong>₹{lab.price}</strong>{lab.originalPrice > lab.price && <del>₹{lab.originalPrice}</del>}<button className="btn btn-primary btn-small" disabled={!lab.available} onClick={() => onBook(lab)}>{lab.available ? 'Choose lab' : 'Unavailable'} <ArrowRight size={14}/></button></div>
  </article>;
}

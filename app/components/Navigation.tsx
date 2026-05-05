import Link from 'next/link';
import { BRAND } from '../brand';

export default function Navigation() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(12,11,9,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-display, serif)',
          fontSize: 20,
          fontWeight: 700,
          color: 'var(--text)',
          textDecoration: 'none',
          letterSpacing: '-0.3px',
        }}
      >
        {BRAND.nameBase}<span style={{ color: 'var(--accent)' }}>{BRAND.nameAccent}</span>
      </Link>
    </nav>
  );
}

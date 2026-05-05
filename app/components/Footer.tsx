import Link from 'next/link';
import { BRAND } from '../brand';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display, serif)',
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--text-muted)',
        }}
      >
        {BRAND.nameBase}<span style={{ color: 'var(--accent)' }}>{BRAND.nameAccent}</span>
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Link href="/privacy" style={{ fontSize: 13, color: 'var(--text-dim)', textDecoration: 'none' }}>
          Privacy
        </Link>
        <Link href="/terms" style={{ fontSize: 13, color: 'var(--text-dim)', textDecoration: 'none' }}>
          Terms
        </Link>
        <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} {BRAND.legal}
        </span>
      </div>
    </footer>
  );
}

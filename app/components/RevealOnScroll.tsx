'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function RevealOnScroll({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = Array.from(
              el.parentElement?.querySelectorAll('.reveal-item:not(.reveal-visible)') ?? []
            );
            const idx = Math.max(0, siblings.indexOf(el));
            setTimeout(() => el.classList.add('reveal-visible'), idx * 80);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-item ${className}`}>
      {children}
    </div>
  );
}

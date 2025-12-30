'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Discipline.module.css';

interface Discipline {
  id: string;
  image: string;
  title: string;
  description: string;
}

const ITEMS: Discipline[] = [
  {
    id: 'karate',
    image: '/images/disciplines/image-1.jpg',
    title: 'Karate bambini e ragazzi',
    description:
      'Il karate, proposto in chiave educativa, sviluppa disciplina, rispetto e sicurezza personale. Un percorso di crescita che unisce movimento, regole e valori.',
  },
  {
    id: 'multisport',
    image: '/images/disciplines/image-2.jpg',
    title: 'Attività multisportive',
    description:
      'Le attività multisportive permettono ai bambini di sperimentare diverse forme di movimento, ampliando il bagaglio motorio senza specializzazione precoce.',
  },
  {
    id: 'centri',
    image: '/images/disciplines/image-3.jpg',
    title: 'Centri estivi educativi',
    description:
      'I centri estivi SPORTIVERSO uniscono gioco, movimento e relazione in un contesto sicuro, guidato da professionisti.',
  },
];

export default function Discipline() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const total = ITEMS.length;

  const go = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  const pause = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const play = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = window.setInterval(() => setIndex((i) => (i + 1) % total), 5000);
  }, [total]);

  useEffect(() => {
    play();
    return pause;
  }, [play, pause]);

  const item = ITEMS[index];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.badge}>Le nostre proposte</span>
          <h2 className={styles.title}>Cosa offre SPORTIVERSO</h2>
          <p className={styles.subtitle}>
            Percorsi educativi attraverso il movimento: karate, attività multisportive e centri estivi.
          </p>
        </header>

        <div
          className={styles.carousel}
          onMouseEnter={pause}
          onMouseLeave={play}
        >
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Precedente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <article className={styles.card}>
            <div className={styles.imageWrap}>
              <Image src={item.image} alt={item.title} fill className={styles.image} sizes="50vw" priority />
            </div>
            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
              <Link href="/percorsi" className={styles.link}>
                Scopri di più
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </div>
          </article>

          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Successiva">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className={styles.thumbs}>
          {ITEMS.map((t, i) => (
            <button
              key={t.id}
              className={`${styles.thumb} ${i === index ? styles.thumbActive : ''}`}
              onClick={() => go(i)}
            >
              <div className={styles.thumbImg}>
                <Image src={t.image} alt="" fill sizes="200px" />
              </div>
              <span className={styles.thumbLabel}>{t.title}</span>
            </button>
          ))}
        </div>

        <div className={styles.nav}>
          <div className={styles.dots}>
            {ITEMS.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <div className={styles.counter}>
            <span className={styles.current}>{String(index + 1).padStart(2, '0')}</span>
            {' / '}
            {String(total).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
}
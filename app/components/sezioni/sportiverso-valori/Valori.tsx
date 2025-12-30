'use client';

import styles from './Valori.module.css';

const VALUES = [
  { title: 'Sviluppo Armonico', desc: 'Rispetto dei tempi individuali.' },
  { title: 'Clima Educativo', desc: 'Ambiente sicuro e non competitivo.' },
  { title: 'Tecnici Qualificati', desc: 'Esperti del settore giovanile.' },
];

const STATS = [
  { value: '3-14', label: 'Età dei ragazzi', variant: 'light' },
  { value: '100%', label: 'Focus Educativo', variant: 'accent' },
  { value: 'Veneto', label: 'Il nostro territorio', variant: 'dark' },
] as const;

export default function Valori() {
  return (
    <section className={styles.valori}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <span className={styles.label}>I Nostri Valori</span>
            <h2 className={styles.title}>
              Lo sport come mezzo,{' '}
              <span className={styles.titleAccent}>non come fine.</span>
            </h2>
            <p className={styles.description}>
              Sportiverso nasce dall&apos;esperienza di tecnici ed educatori che
              vedono il bambino al centro di ogni attività. Non cerchiamo la
              performance precoce, ma lo sviluppo motorio, la sicurezza emotiva
              e la gioia di stare in gruppo.
            </p>
            <blockquote className={styles.quote}>
              &ldquo;Il movimento è il primo linguaggio del bambino. Attraverso
              il corpo, impara a conoscere sé stesso e il mondo.&rdquo;
            </blockquote>
            <ul className={styles.valuesList}>
              {VALUES.map((v) => (
                <li key={v.title} className={styles.valueItem}>
                  <span className={styles.valueDot} />
                  <span>
                    <strong className={styles.valueTitle}>{v.title}:</strong>{' '}
                    <span className={styles.valueDesc}>{v.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <aside className={styles.stats}>
            {STATS.map((s) => (
              <div
                key={s.label}
                className={`${styles.statCard} ${styles[`statCard--${s.variant}`]}`}
              >
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './percorsi.module.css';

const PERCORSI = [
  {
    tag: '3–5 Anni',
    title: 'Educazione Motoria',
    desc: 'Un percorso per scoprire il corpo e il movimento attraverso il gioco guidato. Creiamo basi motorie e relazionali solide.',
    features: ['Coordinazione ed equilibrio', 'Prime regole di gruppo', 'Ambiente rassicurante'],
  },
  {
    tag: 'Disciplina',
    title: 'Karate Educativo',
    desc: 'Il karate come strumento di crescita personale. Sviluppiamo rispetto, autocontrollo e sicurezza senza competizione.',
    features: ['Gestione delle emozioni', 'Rispetto dell`altro', 'Consapevolezza del corpo'],
  },
  {
    tag: 'Varietà',
    title: 'Attività Multisportive',
    desc: 'Saltare, correre, lanciare: un`esperienza varia per sviluppare competenze motorie trasferibili.',
    features: ['Esperienza non specializzata', 'Sviluppo motorio completo', 'Gioco di squadra'],
  },
  {
    tag: 'Estate',
    title: 'Centri Estivi Educativi',
    desc: 'Socializzazione e divertimento durante il periodo estivo. Giornate strutturate guidate da professionisti.',
    features: ['Autonomia e relazione', 'Attività all`aperto', 'Qualità educativa'],
  },
];

export default function PercorsiPage() {
  return (
    <main>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/images/disciplines/image-4.jpg" alt="" fill sizes="100vw" priority />
        </div>
        <div className="container">
          <span className={styles.label}>Offerta Formativa</span>
          <h1 className={styles.title}>I Nostri Percorsi Educativi</h1>
          <p className={styles.subtitle}>
            Proposte strutturate per ogni fascia d'età, pensate per accompagnare
            la crescita armonica di bambini e ragazzi attraverso il movimento.
          </p>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.percorsiGrid}>
            {PERCORSI.map((p) => (
              <article key={p.title} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.tag}>{p.tag}</span>
                  <h2 className={styles.cardTitle}>{p.title}</h2>
                </div>
                <p className={styles.cardDescription}>{p.desc}</p>
                <ul className={styles.features}>
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaBg}>
          <Image src="/images/disciplines/image-1.jpg" alt="" fill sizes="100vw" />
        </div>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Interessato ai nostri percorsi?</h2>
            <p>Siamo qui per orientarti verso la scelta più adatta allo sviluppo di tuo figlio.</p>
            <Link href="/contatti" className={styles.ctaBtn}>Parla con un responsabile</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
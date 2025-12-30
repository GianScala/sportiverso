import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './chi-siamo.module.css';

const VALUES = [
  {
    title: 'Il bambino al centro',
    desc: 'Ogni proposta parte dalle esigenze individuali e dai ritmi di crescita di ciascun partecipante.',
    image: '/images/disciplines/image-1.jpg',
  },
  {
    title: 'Clima di fiducia',
    desc: "Relazioni basate su ascolto e sostegno. L'errore è parte naturale dell'apprendimento.",
    image: '/images/disciplines/image-2.jpg',
  },
  {
    title: 'Inclusione e rispetto',
    desc: 'Un ambiente accogliente dove ogni bambino si sente valorizzato e parte del gruppo.',
    image: '/images/disciplines/image-3.jpg',
  },
  {
    title: 'Crescita integrale',
    desc: 'Sviluppiamo coordinazione, autostima e consapevolezza di sé attraverso il movimento.',
    image: '/images/disciplines/image-4.jpg',
  },
];

export default function ChiSiamoPage() {
  return (
    <main>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/images/hero-sportiverso-palestra.jpg" alt="" fill sizes="100vw" priority />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <span className={styles.label}>I Nostri Valori</span>
              <h1 className={styles.title}>
                Lo sport come strumento educativo
              </h1>
              <p className={styles.subtitle}>
                SPORTIVERSO ASD pone al centro la crescita integrale del bambino,
                utilizzando movimento e gioco per sviluppare competenze motorie,
                emotive e relazionali.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>3-14</span>
                  <span className={styles.statLabel}>Anni</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>100%</span>
                  <span className={styles.statLabel}>Educativo</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>3</span>
                  <span className={styles.statLabel}>Comuni</span>
                </div>
              </div>
            </div>
            <div className={styles.heroCard}>
              <h3>Inizia il percorso</h3>
              <p>
                Scopri come lo sport può diventare uno strumento di crescita per
                tuo figlio. Offriamo percorsi personalizzati nel territorio veneto.
              </p>
              <Link href="/contatti" className={styles.heroBtn}>
                Prenota una prova gratuita
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className="container">
          <h2 className={styles.sectionTitle}>I principi che ci guidano</h2>
          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <article key={v.title} className={styles.valueCard}>
                <div className={styles.cardImageWrap}>
                  <Image src={v.image} alt={v.title} fill className={styles.cardImage} sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
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
            <h2>Accompagnamo i bambini a crescere</h2>
            <p>
              Operiamo a <strong>Martellago, Salzano e Maerne</strong>, offrendo
              percorsi educativi attraverso lo sport per famiglie del territorio.
            </p>
            <Link href="/contatti" className={styles.ctaBtn}>Contattaci</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
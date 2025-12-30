import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import styles from './privacy.module.css'

export default function PrivacyPage() {
  return (
    <main>
      <Header />

      {/* Hero Section - Nessun sfondo */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.label}>Informativa Privacy</span>
          <h1 className={styles.title}>La protezione dei tuoi dati è la nostra priorità</h1>
          <p className={styles.subtitle}>
            SPORTIVERSO ASD tratta i dati personali con trasparenza e nel pieno rispetto del Regolamento UE 2016/679 (GDPR).
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.content}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Informativa sul trattamento dei dati personali</h2>

          <div className={styles.textBlock}>
            <h3>1. Titolare del trattamento</h3>
            <p>
              SPORTIVERSO ASD<br />
              Sede: [inserire indirizzo completo, es. Via Example 123, Martellago (VE)]<br />
              Codice Fiscale/Partita IVA: [inserire]<br />
              Email: [inserire email]<br />
              PEC: [inserire PEC se disponibile]
            </p>
          </div>

          <div className={styles.textBlock}>
            <h3>2. Dati trattati e finalità</h3>
            <p>
              I dati personali raccolti (anagrafici, contatti, certificati medici, immagini dei minori) sono utilizzati
              esclusivamente per:
            </p>
            <ul>
              <li>Gestire iscrizioni, tesseramenti e partecipazione alle attività sportive;</li>
              <li>Adempiere obblighi legali, fiscali e statutari (CONI, federazioni sportive);</li>
              <li>Inviare comunicazioni relative alle attività dell&apos;associazione;</li>
              <li>Pubblicare foto e video per scopi promozionali (solo con consenso esplicito).</li>
            </ul>
            <p>Base giuridica: esecuzione del contratto associativo, obblighi di legge, consenso dell&apos;interessato.</p>
          </div>

          <div className={styles.textBlock}>
            <h3>3. Trattamento dati dei minori</h3>
            <p>
              L&apos;associazione tratta prevalentemente dati di bambini e minori. Il consenso al trattamento è sempre fornito
              dai genitori o dagli esercenti la responsabilità genitoriale. Per eventuali servizi online diretti a minori
              sotto i 14 anni, richiediamo autorizzazione esplicita dei genitori.
            </p>
          </div>

          <div className={styles.textBlock}>
            <h3>4. Diritti dell&apos;interessato</h3>
            <p>Puoi esercitare in qualsiasi momento i diritti di:</p>
            <ul>
              <li>Accesso, rettifica, cancellazione dei dati;</li>
              <li>Limitazione e opposizione al trattamento;</li>
              <li>Portabilità dei dati;</li>
              <li>Revoca del consenso (in particolare per foto/video).</li>
            </ul>
            <p>Contattaci via email o raccomandata A/R.</p>
          </div>

          <div className={styles.textBlock}>
            <h3>5. Conservazione e sicurezza</h3>
            <p>
              I dati sono conservati per il tempo strettamente necessario (massimo 10 anni per obblighi fiscali).
              Adottiamo misure di sicurezza adeguate per proteggerli da accessi non autorizzati.
            </p>
          </div>

          <div className={styles.textBlock}>
            <h3>6. Cookie e sito web</h3>
            <p>
              Il sito utilizza solo cookie tecnici necessari al funzionamento. Non utilizziamo cookie di profilazione o
              terze parti senza consenso.
            </p>
          </div>

          <p className={styles.update}>Ultimo aggiornamento: 30 dicembre 2025</p>
        </div>
      </section>

      {/* CTA Section - Nessun sfondo colorato */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Hai domande o richieste sulla privacy?</h2>
            <p>Scrivici per chiarimenti o per esercitare i tuoi diritti.</p>
            <a href="/contatti" className="btn btn-primary">
              Contattaci
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

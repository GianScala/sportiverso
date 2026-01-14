'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

// Import your custom icons
import WhatsappIcon from '@/app/icons/WhatsappIcon';
import FacebookIcon from '@/app/icons/FacebookIcon';
import InstagramIcon from '@/app/icons/InstagramIcon';

// Environment variables for sensitive data
const PIVA = process.env.NEXT_PUBLIC_PIVA || '04809810270';
const CODICEFISCALE = process.env.NEXT_PUBLIC_CODICEFISCALE || '90201040277';
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+393514049996';

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  // Update year on client side to avoid hydration mismatch
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Sportiverso Home">
          SPORTIVERSO<span>.it</span>
        </Link>

        {/* Navigation Links */}
        <nav className={styles.links} aria-label="Footer navigation">
          <Link href="/chi-siamo">Chi Siamo</Link>
          <Link href="/percorsi">Percorsi</Link>
          <Link href="/contatti">Contattaci</Link>
        </nav>

        {/* Social Media Section */}
        <div className={styles.socialRow}>
          <address className={styles.address}>
            Martellago, Salzano, Maerne e zone limitrofe (VE)
          </address>

          <div className={styles.social} aria-label="Social media links">
            <a
              href="https://www.instagram.com/sportiverso.karate/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguici su Instagram"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://www.facebook.com/p/SPORTIVERSOkarate-61563855597535/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguici su Facebook"
            >
              <FacebookIcon />
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Ciao%20Sportiverso!`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contattaci su WhatsApp"
            >
              <WhatsappIcon />
            </a>
          </div>
        </div>

        {/* Legal Information */}
        <div className={styles.legal}>
          <small>
            © {year} SPORTIVERSO ASD · P.IVA {PIVA} · C.F. {CODICEFISCALE}
          </small>
          <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
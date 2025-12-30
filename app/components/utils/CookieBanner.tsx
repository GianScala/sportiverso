'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './cookies.module.css';

// ============================================
// Cookie Utility Functions
// ============================================
const setCookie = (name: string, value: string, days: number = 365) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

// ============================================
// Icon Components
// ============================================
const CookieIcon = () => (
  <svg viewBox="0 0 64 64" className={styles.cookieIcon} aria-hidden="true">
    <defs>
      <linearGradient id="cookieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff7aa5" />
        <stop offset="100%" stopColor="#e91e63" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#cookieGradient)" />
    <circle cx="22" cy="24" r="4" fill="#fff3f6" opacity="0.9" />
    <circle cx="40" cy="20" r="3" fill="#fff3f6" opacity="0.9" />
    <circle cx="26" cy="40" r="5" fill="#fff3f6" opacity="0.9" />
    <circle cx="44" cy="36" r="4" fill="#fff3f6" opacity="0.9" />
    <circle cx="34" cy="30" r="3" fill="#fff3f6" opacity="0.9" />
  </svg>
);

const CloseIcon = () => (
  <svg className={styles.closeIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg className={styles.optionIconSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const ChartIcon = () => (
  <svg className={styles.optionIconSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg className={styles.optionIconSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
  </svg>
);

// ============================================
// Toggle Switch Component
// ============================================
interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch = ({ id, checked, onChange, disabled = false }: ToggleSwitchProps) => (
  <label htmlFor={id} className={styles.toggleWrapper}>
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => !disabled && onChange(e.target.checked)}
      disabled={disabled}
      className={styles.toggleInput}
    />
    <div className={styles.toggleTrack} />
  </label>
);

// ============================================
// Types
// ============================================
interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

// ============================================
// Main Component
// ============================================
export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  // Check if consent was already given
  useEffect(() => {
    const consentGiven = getCookie('sportiverso_consent');
    if (!consentGiven) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setPreferences({
        necessary: true,
        analytics: getCookie('sportiverso_analytics') === 'true',
        marketing: getCookie('sportiverso_marketing') === 'true',
      });
    }
  }, []);

  const saveConsent = useCallback((analytics: boolean, marketing: boolean) => {
    setCookie('sportiverso_consent', 'true');
    setCookie('sportiverso_analytics', analytics.toString());
    setCookie('sportiverso_marketing', marketing.toString());

    if (analytics) {
      window.dispatchEvent(new CustomEvent('consent:analytics', { detail: { enabled: true } }));
    }
    if (marketing) {
      window.dispatchEvent(new CustomEvent('consent:marketing', { detail: { enabled: true } }));
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent(true, true);
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 400);
  };

  const handleRejectAll = () => {
    saveConsent(false, false);
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 400);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences.analytics, preferences.marketing);
    setShowPreferences(false);
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 400);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Banner */}
      <div
        className={`${styles.banner} ${isAnimating ? styles.bannerVisible : styles.bannerHidden}`}
        role="dialog"
        aria-modal="false"
        aria-label="Preferenze sui cookie"
      >
        <div className={styles.gradientLine} />

        <div className={styles.bannerContent}>
          <div className={styles.bannerInner}>
            <div className={styles.bannerLayout}>
              {/* Icon + Text */}
              <div className={styles.textSection}>
                <div className={styles.cookieIconWrapper}>
                  <CookieIcon />
                </div>
                <div className={styles.textContent}>
                  <h2 className={styles.bannerTitle}>🍪 Il Tuo Consenso Conta!</h2>
                  <p className={styles.bannerText}>
                    Utilizziamo i cookie per migliorare la tua esperienza su Sportiverso.
                    Puoi personalizzare le tue preferenze o accettare tutto per continuare.{' '}
                    <a href="/privacy-policy" className={styles.privacyLink}>
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className={styles.buttonGroup}>
                <button onClick={() => setShowPreferences(true)} className={styles.btnCustomize}>
                  Personalizza
                </button>
                <button onClick={handleRejectAll} className={styles.btnReject}>
                  Solo Necessari
                </button>
                <button onClick={handleAcceptAll} className={styles.btnAccept}>
                  Accetta Tutti ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Gestisci preferenze cookie"
        >
          <div className={styles.modalBackdrop} onClick={() => setShowPreferences(false)} />

          <div className={styles.modal}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderTop}>
                <div className={styles.modalTitleWrapper}>
                  <div className={styles.modalIconBadge}>🍪</div>
                  <h2 className={styles.modalTitle}>Preferenze Cookie</h2>
                </div>
                <button
                  onClick={() => setShowPreferences(false)}
                  className={styles.closeButton}
                  aria-label="Chiudi"
                >
                  <CloseIcon />
                </button>
              </div>
              <p className={styles.modalDescription}>
                Scegli quali cookie accettare. I cookie necessari sono sempre attivi per garantire
                il funzionamento del sito.
              </p>
            </div>

            {/* Cookie Options */}
            <div className={styles.modalBody}>
              <div className={styles.optionsList}>
                {/* Necessary Cookies */}
                <div className={styles.optionCardNecessary}>
                  <div className={styles.optionContent}>
                    <div className={styles.optionInfo}>
                      <div className={styles.optionIconNecessary}>
                        <ShieldIcon />
                      </div>
                      <div className={styles.optionText}>
                        <h3 className={styles.optionTitle}>Cookie Necessari</h3>
                        <p className={styles.optionDescription}>
                          Essenziali per la navigazione e le funzionalità base del sito.
                        </p>
                      </div>
                    </div>
                    <span className={styles.alwaysActiveBadge}>Sempre attivi</span>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className={styles.optionCard}>
                  <div className={styles.optionContent}>
                    <div className={styles.optionInfo}>
                      <div className={styles.optionIconDefault}>
                        <ChartIcon />
                      </div>
                      <div className={styles.optionText}>
                        <h3 className={styles.optionTitle}>Cookie Analitici</h3>
                        <p className={styles.optionDescription}>
                          Ci aiutano a capire come utilizzi il sito per migliorarlo.
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="analytics-toggle"
                      checked={preferences.analytics}
                      onChange={(checked) => setPreferences((p) => ({ ...p, analytics: checked }))}
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className={styles.optionCard}>
                  <div className={styles.optionContent}>
                    <div className={styles.optionInfo}>
                      <div className={styles.optionIconDefault}>
                        <MegaphoneIcon />
                      </div>
                      <div className={styles.optionText}>
                        <h3 className={styles.optionTitle}>Cookie di Marketing</h3>
                        <p className={styles.optionDescription}>
                          Per contenuti e pubblicità personalizzati sui social media.
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch
                      id="marketing-toggle"
                      checked={preferences.marketing}
                      onChange={(checked) => setPreferences((p) => ({ ...p, marketing: checked }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={styles.modalFooter}>
              <button onClick={handleRejectAll} className={styles.btnFooterReject}>
                Rifiuta Opzionali
              </button>
              <button onClick={handleSavePreferences} className={styles.btnFooterSave}>
                Salva Preferenze
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
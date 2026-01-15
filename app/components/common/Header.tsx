"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

import PercorsiIcon from "@/app/icons/PercorsiIcon";
import ChiSiamoIcon from "@/app/icons/ChiSiamoIcon";
import ContattiIcon from "@/app/icons/ContattiIcon";
import FacebookIcon from "@/app/icons/FacebookIcon";
import InstagramIcon from "@/app/icons/InstagramIcon";
import WhatsappIcon from "@/app/icons/WhatsappIcon";

import { useLockBodyScroll } from "@/app/components/utils/useLockBodyScroll";

const WHATSAPP_NUMBER = "+393514049996";

// Logo configuration
const LOGO_WHITE = "/images/logo_white.png"; // White logo for DARK backgrounds
const LOGO_DARK = "/images/logo_dark.png";   // Dark logo for WHITE backgrounds

const NAV_ITEMS = [
  { href: "/chi-siamo", label: "CHI SIAMO", icon: <ChiSiamoIcon /> },
  { href: "/percorsi", label: "PERCORSI", icon: <PercorsiIcon /> },
  { href: "/contatti", label: "CONTATTACI", icon: <ContattiIcon /> },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/p/SPORTIVERSOkarate-61563855597535/",
    label: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    href: "https://www.instagram.com/sportiverso.karate/",
    label: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=Ciao%20Sportiverso!`,
    label: "WhatsApp",
    icon: <WhatsappIcon />,
  },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  // Robust scroll lock (replaces your old effect)
  useLockBodyScroll({ enabled: isOpen });

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // IMPORTANT: Close menu on route change so body unlock happens BEFORE ScrollToTop runs.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Header is "active" when scrolled, not home, or menu open
  // When active = WHITE background = use DARK logo
  // When not active (home hero) = DARK background = use WHITE logo
  const isHeaderActive = scrolled || !isHome || isOpen;

  // Helper: ensure we close menu immediately when navigating via mobile links/logo
  const handleNavigate = () => {
    closeMenu();
  };

  return (
    <>
      {/* Home page: fixed logo + sidebars (only when not scrolled) */}
      {/* DARK background → WHITE logo */}
      {isHome && !scrolled && (
        <>
          <Link href="/" className={styles.homeLogo}>
            <Image
              src={LOGO_WHITE}
              alt="Sportiverso"
              width={140}
              height={40}
              priority
              className={styles.logoImage}
            />
          </Link>

          <nav className={styles.leftSidebar}>
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className={styles.sidebarLink}>
                <span className={styles.sidebarIcon}>{item.icon}</span>
                <span className={styles.sidebarLabel}>{item.label}</span>
              </Link>
            ))}
          </nav>

          <aside className={styles.rightSidebar}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </aside>
        </>
      )}

      {/* Scrolled or not home: horizontal header */}
      {/* WHITE background → DARK logo */}
      {(scrolled || !isHome) && (
        <header className={styles.desktopHeader}>
          <div className={styles.headerContainer}>
            <Link href="/" className={styles.scrolledLogo}>
              <Image
                src={LOGO_DARK}
                alt="Sportiverso"
                width={130}
                height={36}
                priority
                className={styles.logoImage}
              />
            </Link>

            <nav className={styles.desktopNav}>
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={styles.headerSocials}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.headerSocialIcon}
                  aria-label={social.label}
                >
                  {social.icon}
              </a>
              ))}
            </div>
          </div>
        </header>
      )}

      {/* Mobile Header */}
      {/* isHeaderActive = WHITE bg → DARK logo */}
      {/* !isHeaderActive = DARK bg (home hero) → WHITE logo */}
      <header className={`${styles.mobileHeader} ${isHeaderActive ? styles.mobileHeaderActive : ""}`}>
        <div className={styles.mobileContainer}>
          <Link
            href="/"
            className={styles.mobileLogo}
            onClick={handleNavigate}
          >
            <Image
              src={isHeaderActive ? LOGO_DARK : LOGO_WHITE}
              alt="Sportiverso"
              width={110}
              height={30}
              priority
              className={styles.logoImage}
            />
          </Link>

          <button
            onClick={toggleMenu}
            className={`${styles.menuToggle} ${isOpen ? styles.menuToggleOpen : ""}`}
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isOpen}
          >
            <span className={`${styles.bar} ${isHeaderActive ? styles.barDark : styles.barLight}`} />
            <span className={`${styles.bar} ${isHeaderActive ? styles.barDark : styles.barLight}`} />
            <span className={`${styles.bar} ${isHeaderActive ? styles.barDark : styles.barLight}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <nav className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`} aria-hidden={!isOpen}>
        <div className={styles.mobileMenuInner}>
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={handleNavigate}
              style={{ transitionDelay: isOpen ? `${i * 0.1}s` : "0s" }}
            >
              <span className={styles.linkIcon}>{item.icon}</span>
              <span className={styles.linkText}>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className={styles.mobileMenuFooter}>
          <div className={styles.socialRow}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileSocialBtn}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default memo(Header);
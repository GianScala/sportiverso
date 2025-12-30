'use client';

import { memo, useRef, useEffect, useState } from 'react';
import styles from './Introduzione.module.css';

interface IntroduzioneProps {
  badge?: string;
  title?: string;
  highlightedTitle?: string;
  subtitle?: string;
  backgroundVideo: string;
  showScrollIndicator?: boolean;
}

const ScrollIndicator = memo(function ScrollIndicator() {
  return (
    <div className={styles.scrollIndicator} aria-hidden="true">
      <div className={styles.scrollMouse}>
        <div className={styles.scrollWheel} />
      </div>
      <span className={styles.scrollText}>Scorri</span>
    </div>
  );
});

function Introduzione({
  badge = 'Educazione Sportiva in Veneto',
  title = 'Benvenuti nello',
  highlightedTitle = 'Sportiverso',
  subtitle = 'Dove il gioco incontra la crescita! Scopri i nostri percorsi educativi pensati per bambini e ragazzi dai 3 ai 14 anni.',
  backgroundVideo,
  showScrollIndicator = true,
}: IntroduzioneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // IMPORTANT: Ensure these are set before calling .play()
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
        setIsVideoLoaded(true);
      } catch (err) {
        console.log("Autoplay blocked on first load. Waiting for interaction.");
      }
    };

    // Attempt play immediately
    playVideo();

    // Fallback: If blocked, play as soon as the user touches the screen or scrolls
    const enableAutoplay = () => {
      if (video.paused) {
        video.play().then(() => setIsVideoLoaded(true)).catch(() => {});
        // Clean up listeners immediately after first success
        window.removeEventListener('mousedown', enableAutoplay);
        window.removeEventListener('touchstart', enableAutoplay);
        window.removeEventListener('scroll', enableAutoplay);
      }
    };

    window.addEventListener('mousedown', enableAutoplay);
    window.addEventListener('touchstart', enableAutoplay);
    window.addEventListener('scroll', enableAutoplay);

    return () => {
      window.removeEventListener('mousedown', enableAutoplay);
      window.removeEventListener('touchstart', enableAutoplay);
      window.removeEventListener('scroll', enableAutoplay);
    };
  }, [backgroundVideo]);

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <video
        ref={videoRef}
        className={`${styles.backgroundVideo} ${isVideoLoaded ? styles.fadeIn : ''}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // Ensure this file actually exists in your /public folder!
        poster="/images/hero-poster.jpg" 
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.content}>
          {badge && <span className={styles.badge}>{badge}</span>}
          <h1 id="hero-heading" className={styles.title}>
            {title}
            {highlightedTitle && (
              <>
                <br />
                <span className={styles.highlight}>{highlightedTitle}</span>
              </>
            )}
          </h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>

      {showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}

export default memo(Introduzione);
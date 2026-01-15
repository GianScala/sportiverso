'use client';

import { memo, useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './Introduzione.module.css';

interface IntroduzioneProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  backgroundVideo: string;
  posterImage: string;
  showScrollIndicator?: boolean;
}

const LOGO_WHITE = "/images/logo_white.png"; // White logo for dark background

const Introduzione = ({
  badge = "Educazione sportiva per bambini e ragazzi in Veneto",
  title = "Benvenuti nello",
  subtitle = "SPORTIVERSO ASD è un progetto di educazione sportiva per bambini e ragazzi, attivo in Veneto, che utilizza lo sport come strumento di crescita motoria, emotiva e relazionale.",
  backgroundVideo,
  posterImage,
  showScrollIndicator = true,
}: IntroduzioneProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStatus, setVideoStatus] = useState<'idle' | 'playing'>('idle');

  const forcePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || videoStatus === 'playing') return;

    try {
      video.muted = true;
      video.defaultMuted = true;
      await video.play();
      setVideoStatus('playing');
    } catch (err) {
      // Browser auto-play policy handling
    }
  }, [videoStatus]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const interactionEvents = ['pointermove', 'touchstart', 'scroll', 'wheel', 'click', 'keydown'];

    const handleUnlock = () => {
      forcePlay();
      if (videoStatus === 'playing') {
        interactionEvents.forEach(e => window.removeEventListener(e, handleUnlock));
      }
    };

    interactionEvents.forEach(e => window.addEventListener(e, handleUnlock, { passive: true }));

    forcePlay();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) forcePlay();
        else video.pause();
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      interactionEvents.forEach(e => window.removeEventListener(e, handleUnlock));
    };
  }, [forcePlay, videoStatus]);

  return (
    <section 
      className={styles.hero} 
      style={{ backgroundImage: `url(${posterImage})` }}
    >
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={`${styles.videoElement} ${videoStatus === 'playing' ? styles.isVisible : ''}`}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>

      <div className={styles.overlay} />

      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {badge && <span className={styles.badge}>{badge}</span>}
          
          <h1 className={styles.title}>
            <span className={styles.titleLine}>{title}</span>
            <span className={styles.highlight}>
              <Image
                src={LOGO_WHITE}
                alt="Sportiverso"
                width={320}
                height={90}
                priority
                className={styles.heroLogo}
              />
            </span>
          </h1>

          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      {showScrollIndicator && (
        <div className={styles.scrollHint}>
          <div className={styles.mouse}><div className={styles.wheel} /></div>
          <span className={styles.scrollLabel}>SCORRI</span>
        </div>
      )}
    </section>
  );
};

export default memo(Introduzione);
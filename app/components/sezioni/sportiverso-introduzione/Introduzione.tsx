'use client';

import { memo, useRef, useEffect, useState, useCallback } from 'react';
import styles from './Introduzione.module.css';

interface IntroduzioneProps {
  badge?: string;
  title?: string;
  highlightedTitle?: string;
  subtitle?: string;
  backgroundVideo: string;
  posterImage: string; // Required to prevent black screen
  showScrollIndicator?: boolean;
}

const Introduzione = ({
  badge = "Educazione sportiva per bambini e ragazzi in Veneto",
  title = "Benvenuti nello",
  highlightedTitle = "Sportiverso",
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
      // Browser is still blocking; the event listeners below will catch the next move
    }
  }, [videoStatus]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Aggressive list of events to "unlock" the video engine
    const interactionEvents = [
      'pointermove', 
      'touchstart', 
      'scroll', 
      'wheel', 
      'click', 
      'keydown'
    ];

    const handleUnlock = () => {
      forcePlay();
      if (videoStatus === 'playing') {
        interactionEvents.forEach(e => window.removeEventListener(e, handleUnlock));
      }
    };

    // Add listeners
    interactionEvents.forEach(e => window.addEventListener(e, handleUnlock, { passive: true }));

    // Try to play immediately (works in some Chrome/Edge versions if already cached)
    forcePlay();

    // Intersection Observer to handle play/pause on scroll
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
      style={{ backgroundImage: `url(${posterImage})` }} // THE FAILSAFE: Poster is the section background
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
          <span className={styles.badge}>{badge}</span>
          <h1 className={styles.title}>
            {title} <br />
            <span className={styles.highlight}>{highlightedTitle}</span>
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
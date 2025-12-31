'use client';

import { memo, useRef, useEffect, useState, useCallback } from 'react';
import styles from './Introduzione.module.css';

interface IntroduzioneProps {
  badge?: string;
  title?: string;
  highlightedTitle?: string;
  subtitle?: string;
  backgroundVideo: string;
  posterImage?: string;
  showScrollIndicator?: boolean;
}

const Introduzione = ({
  badge = "Educazione Sportiva in Veneto",
  title = "Benvenuti nello",
  highlightedTitle = "Sportiverso",
  subtitle = "Dove il gioco incontra la crescita! Scopri i nostri percorsi educativi pensati per bambini e ragazzi dai 3 ai 14 anni.",
  backgroundVideo,
  posterImage = "/images/hero-poster.jpg",
  showScrollIndicator = true,
}: IntroduzioneProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = true; // Essential for autoplay
      await video.play();
      setIsVideoPlaying(true);
    } catch (error) {
      console.log("Autoplay prevented. Waiting for user interaction...");
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Initial attempt
    attemptPlay();

    // 2. Interaction listener (unblocks video on first scroll or touch)
    const handleInteraction = () => {
      if (!isVideoPlaying) attemptPlay();
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction);

    // 3. Intersection Observer (Pause when not in view to save resources)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [attemptPlay, isVideoPlaying]);

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={`${styles.backgroundVideo} ${isVideoPlaying ? styles.visible : ''}`}
          poster={posterImage}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        {/* Placeholder background while video loads */}
        <div 
          className={styles.posterFallback} 
          style={{ backgroundImage: `url(${posterImage})`, opacity: isVideoPlaying ? 0 : 1 }} 
        />
      </div>

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          {badge && <span className={styles.badge}>{badge}</span>}
          
          <h1 id="hero-heading" className={styles.title}>
            {title}
            <span className={styles.highlight}>{highlightedTitle}</span>
          </h1>

          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>

      {showScrollIndicator && (
        <div className={styles.scrollIndicator} aria-hidden="true">
          <div className={styles.mouse}>
            <div className={styles.wheel} />
          </div>
          <span className={styles.scrollText}>Scorri</span>
        </div>
      )}
    </section>
  );
};

export default memo(Introduzione);
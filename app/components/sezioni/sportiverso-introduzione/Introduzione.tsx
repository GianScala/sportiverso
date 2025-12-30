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

  const isYouTube =
    backgroundVideo.includes('youtube.com') ||
    backgroundVideo.includes('youtu.be');

  // Extract YouTube video ID
  const videoId = isYouTube
    ? backgroundVideo
        .replace('https://youtu.be/', '')
        .split('v=')?.[1]?.split('&')?.[0] || backgroundVideo.split('/').pop()
    : null;

  useEffect(() => {
    if (isYouTube) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;

    const tryPlay = async () => {
      try {
        await video.play();
        setIsVideoLoaded(true);
      } catch {
        console.log('Autoplay blocked, waiting for interaction.');
      }
    };

    tryPlay();

    const handleInteraction = () => {
      tryPlay();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('scroll', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, [backgroundVideo, isYouTube]);

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* ---------- YOUTUBE MODE ---------- */}
      {isYouTube && videoId ? (
        <div className={styles.videoWrapper}>
          <iframe
            className={`${styles.youtubeBackground} ${
              isVideoLoaded ? styles.fadeIn : ''
            }`}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${videoId}&playsinline=1&modestbranding=1&rel=0&enablejsapi=1`}
            title="Background video"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            onLoad={() => setIsVideoLoaded(true)}
          />
        </div>
      ) : (

        /* ---------- MP4 MODE ---------- */
        <video
          ref={videoRef}
          className={`${styles.backgroundVideo} ${
            isVideoLoaded ? styles.fadeIn : ''
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

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

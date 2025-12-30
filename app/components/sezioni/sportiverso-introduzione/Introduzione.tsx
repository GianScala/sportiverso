'use client';

import { memo, useRef, useEffect, useState, useCallback } from 'react';
import styles from './Introduzione.module.css';

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

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
  const playerRef = useRef<YT.Player | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const isYouTube =
    backgroundVideo.includes('youtube.com') ||
    backgroundVideo.includes('youtu.be');

  const getYouTubeId = useCallback((url: string): string | null => {
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || null;
    }
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      return urlParams.get('v');
    }
    if (url.includes('youtube.com/embed/')) {
      return url.split('embed/')[1]?.split('?')[0] || null;
    }
    return null;
  }, []);

  const videoId = isYouTube ? getYouTubeId(backgroundVideo) : null;

  useEffect(() => {
    if (!isYouTube || !videoId) return;

    let isMounted = true;

    const createPlayer = () => {
      const container = document.getElementById('youtube-player-container');
      if (!container) return;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore cleanup errors
        }
        playerRef.current = null;
      }

      container.innerHTML = '<div id="youtube-player"></div>';

      try {
        playerRef.current = new window.YT.Player('youtube-player', {
          videoId: videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            loop: 1,
            playlist: videoId,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            disablekb: 1,
            fs: 0,
            origin: typeof window !== 'undefined' ? window.location.origin : '',
            enablejsapi: 1,
          },
          events: {
            onReady: (event) => {
              if (!isMounted) return;
              event.target.mute();
              event.target.playVideo();
              setIsVideoLoaded(true);
            },
            onStateChange: (event) => {
              if (event.data === 0) {
                event.target.playVideo();
              }
              if (event.data === 2) {
                setTimeout(() => event.target.playVideo(), 100);
              }
              if (event.data === 1) {
                setIsVideoLoaded(true);
              }
            },
          },
        });
      } catch {
        // Ignore player creation errors
      }
    };

    const initializeAPI = () => {
      if (window.YT && window.YT.Player) {
        setTimeout(createPlayer, 100);
        return;
      }

      if (!document.getElementById('youtube-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
          document.head.appendChild(tag);
        }
      }

      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        if (isMounted) setTimeout(createPlayer, 100);
      };

      const pollInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(pollInterval);
          if (isMounted && !playerRef.current) createPlayer();
        }
      }, 200);

      setTimeout(() => clearInterval(pollInterval), 10000);
    };

    const initTimeout = setTimeout(initializeAPI, 100);

    return () => {
      isMounted = false;
      clearTimeout(initTimeout);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore cleanup errors
        }
        playerRef.current = null;
      }
    };
  }, [isYouTube, videoId]);

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
        // Autoplay blocked
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
      {isYouTube && videoId ? (
        <div className={styles.videoWrapper}>
          <div
            id="youtube-player-container"
            className={`${styles.youtubeBackground} ${isVideoLoaded ? styles.fadeIn : ''}`}
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          className={`${styles.backgroundVideo} ${isVideoLoaded ? styles.fadeIn : ''}`}
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
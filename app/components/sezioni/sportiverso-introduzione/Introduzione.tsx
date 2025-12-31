'use client';

import {
  memo,
  useRef,
  useEffect,
  useState,
  useCallback,
  type VideoHTMLAttributes,
} from 'react';
import styles from './Introduzione.module.css';

// ==================== TYPES ====================

interface IntroduzioneProps {
  /** Badge text displayed above the title */
  badge?: string;
  /** Main title text */
  title?: string;
  /** Highlighted portion of the title (displayed on second line) */
  highlightedTitle?: string;
  /** Subtitle/description text */
  subtitle?: string;
  /** Path to the background video file (MP4) */
  backgroundVideo: string;
  /** Optional poster image shown before video loads */
  posterImage?: string;
  /** Whether to show the scroll indicator at bottom */
  showScrollIndicator?: boolean;
  /** Callback fired when video starts playing */
  onVideoLoad?: () => void;
  /** Callback fired if video fails to load/play */
  onVideoError?: (error: Error) => void;
}

// Extend video attributes to include webkit-specific properties
type ExtendedVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  'webkit-playsinline'?: string;
};

// ==================== CONSTANTS ====================

const DEFAULT_PROPS = {
  badge: 'Educazione Sportiva in Veneto',
  title: 'Benvenuti nello',
  highlightedTitle: 'Sportiverso',
  subtitle:
    'Dove il gioco incontra la crescita! Scopri i nostri percorsi educativi pensati per bambini e ragazzi dai 3 ai 14 anni.',
  posterImage: '/images/hero-poster.jpg',
  showScrollIndicator: true,
} as const;

const INTERACTION_EVENTS = ['mousedown', 'touchstart', 'scroll', 'click'] as const;

// ==================== SUBCOMPONENTS ====================

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

ScrollIndicator.displayName = 'ScrollIndicator';

// ==================== CUSTOM HOOK ====================

/**
 * Custom hook to handle video autoplay with fallback for browsers
 * that block autoplay without user interaction.
 */
function useVideoAutoplay(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  onLoad?: () => void,
  onError?: (error: Error) => void
) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const hasPlayedRef = useRef(false);

  const attemptPlay = useCallback(async (): Promise<boolean> => {
    const video = videoRef.current;
    if (!video || hasPlayedRef.current) return false;

    try {
      // Ensure muted is set (required for autoplay on most browsers)
      video.muted = true;
      await video.play();
      hasPlayedRef.current = true;
      setIsLoaded(true);
      onLoad?.();
      return true;
    } catch (err) {
      // DOMException with name 'NotAllowedError' means autoplay was blocked
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        console.debug('Video autoplay blocked, waiting for user interaction');
        return false;
      }
      // Other errors are actual failures
      const error = err instanceof Error ? err : new Error('Video playback failed');
      setHasError(true);
      onError?.(error);
      console.error('Video playback error:', error);
      return false;
    }
  }, [videoRef, onLoad, onError]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use AbortController for cleaner event listener cleanup
    const abortController = new AbortController();
    const { signal } = abortController;

    // Configure video element for autoplay compatibility
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    // Handle video ready states
    const handleCanPlay = () => void attemptPlay();
    const handlePlaying = () => {
      hasPlayedRef.current = true;
      setIsLoaded(true);
    };
    const handleError = () => {
      setHasError(true);
      onError?.(new Error('Video failed to load'));
    };

    // Fallback: Play on user interaction if autoplay was blocked
    const handleInteraction = async () => {
      const success = await attemptPlay();
      if (success) {
        abortController.abort();
      }
    };

    // Add video element listeners
    video.addEventListener('canplay', handleCanPlay, { signal });
    video.addEventListener('playing', handlePlaying, { signal });
    video.addEventListener('error', handleError, { signal });

    // Add interaction listeners as fallback
    INTERACTION_EVENTS.forEach((event) => {
      window.addEventListener(event, handleInteraction, { passive: true, signal });
    });

    // Initial play attempt
    void attemptPlay();

    return () => {
      abortController.abort();
    };
  }, [attemptPlay, onError, videoRef]);

  return { isLoaded, hasError };
}

// ==================== MAIN COMPONENT ====================

function Introduzione({
  badge = DEFAULT_PROPS.badge,
  title = DEFAULT_PROPS.title,
  highlightedTitle = DEFAULT_PROPS.highlightedTitle,
  subtitle = DEFAULT_PROPS.subtitle,
  backgroundVideo,
  posterImage = DEFAULT_PROPS.posterImage,
  showScrollIndicator = DEFAULT_PROPS.showScrollIndicator,
  onVideoLoad,
  onVideoError,
}: IntroduzioneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isLoaded, hasError } = useVideoAutoplay(videoRef, onVideoLoad, onVideoError);

  // Build video className based on state
  const videoClassName = [
    styles.backgroundVideo,
    isLoaded && styles.fadeIn,
    hasError && styles.hidden,
  ]
    .filter(Boolean)
    .join(' ');

  // Extended video props including webkit-specific attributes
  const videoProps: ExtendedVideoProps = {
    className: videoClassName,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    preload: 'auto',
    poster: posterImage,
    'webkit-playsinline': 'true',
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* Background Video */}
      <video ref={videoRef} {...videoProps}>
        <source src={backgroundVideo} type="video/mp4" />
        {/* Fallback text for screen readers and unsupported browsers */}
        <span className={styles.srOnly}>
          Video di sfondo che mostra attività sportive per bambini
        </span>
      </video>

      {/* Gradient Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Content Container */}
      <div className={styles.container}>
        <div className={styles.content}>
          {badge && (
            <span className={styles.badge} role="doc-subtitle">
              {badge}
            </span>
          )}

          <h1 id="hero-heading" className={styles.title}>
            {title}
            {highlightedTitle && (
              <>
                <br />
                <span className={styles.highlight}>{highlightedTitle}</span>
              </>
            )}
          </h1>

          {subtitle && (
            <p className={styles.subtitle}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}

Introduzione.displayName = 'Introduzione';

export default memo(Introduzione);
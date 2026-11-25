import React, { useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

/**
 * Sun Icon — Warm Amber in Light mode
 */
function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.15" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

/**
 * Moon Icon — Soft Celestial Slate in Dark mode
 */
function MoonIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill="currentColor"
        fillOpacity="0.2"
      />
    </svg>
  );
}

/**
 * Interactive, origin-based circular reveal theme toggle button.
 * Uses View Transitions API with full fallback for unsupported browsers
 * or reduced motion preferences, while preventing double-triggering.
 */
export default function ColorModeToggle({
  className,
  buttonClassName,
  value,
  onChange,
}) {
  const isBrowser = useIsBrowser();
  const { colorMode, setColorMode } = useColorMode();
  const buttonRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Clean up any remaining temporary attribute if component unmounts
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.removeAttribute('data-theme-transitioning');
      }
    };
  }, []);

  // Current active mode (respects explicit value prop or falls back to hook)
  const activeColorMode = value ?? colorMode;
  const isDark = activeColorMode === 'dark';

  const handleToggle = async (e) => {
    e.preventDefault();

    // Prevent double-triggering or concurrent transitions
    if (isTransitioningRef.current) {
      return;
    }

    const nextMode = isDark ? 'light' : 'dark';

    const applyTheme = (mode) => {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', mode);
        document.documentElement.style.colorScheme = mode;
      }
      if (onChange) {
        onChange(mode);
      } else {
        setColorMode(mode);
      }
    };

    // Check for reduced motion preference or missing View Transitions API
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (
      typeof document === 'undefined' ||
      !document.startViewTransition ||
      prefersReducedMotion
    ) {
      applyTheme(nextMode);
      return;
    }

    // Capture button center coordinates as animation origin
    const button = buttonRef.current || e.currentTarget;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (button) {
      const rect = button.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    // Calculate maximum radius to ensure the circular reveal covers all viewport corners
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    isTransitioningRef.current = true;
    setIsTransitioning(true);
    document.documentElement.setAttribute('data-theme-transitioning', 'true');

    try {
      const transition = document.startViewTransition(() => {
        // Synchronously flush state and DOM updates for a complete, crisp new snapshot
        flushSync(() => {
          applyTheme(nextMode);
        });
      });

      await transition.ready;

      // Animate the circular clip path expanding outward from the toggle button
      const animation = document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );

      await animation.finished;
    } catch (err) {
      // Graceful fallback if view transition is interrupted or rejected
      console.debug('Theme view transition:', err);
    } finally {
      document.documentElement.removeAttribute('data-theme-transitioning');
      isTransitioningRef.current = false;
      setIsTransitioning(false);
    }
  };

  const title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const ariaLabel = `Switch between dark and light mode (currently ${
    isDark ? 'dark' : 'light'
  } mode)`;

  return (
    <div className={clsx(styles.toggleContainer, className)}>
      <button
        ref={buttonRef}
        type="button"
        className={clsx(
          styles.toggleButton,
          (!isBrowser || isTransitioning) && styles.toggleButtonDisabled,
          isTransitioning && styles.toggleButtonTransitioning,
          buttonClassName
        )}
        onClick={handleToggle}
        disabled={!isBrowser || isTransitioning}
        aria-busy={isTransitioning ? 'true' : undefined}
        title={title}
        aria-label={ariaLabel}
      >
        <span className={styles.iconTrack}>
          <span className={clsx(styles.iconItem, styles.sunIcon)}>
            <SunIcon />
          </span>
          <span className={clsx(styles.iconItem, styles.moonIcon)}>
            <MoonIcon />
          </span>
        </span>
      </button>
    </div>
  );
}

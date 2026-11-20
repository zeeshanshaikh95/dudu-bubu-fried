import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { assetUrl } from '@/lib/brand';
import type { HeroSlide } from '@/types';

const FALLBACK_SLIDE: HeroSlide = {
  imageUrl: '/images/hero-fryer.jpg',
  eyebrow: 'Miraroad, Thane · 4 PM – 12 AM',
  headline: 'Fried. Glazed. Devoured.',
  subheadline:
    'Arabian, Korean and Turkish fried chicken, out of the fryer to your door — plus boba and shakes to put the fire out.',
  ctaLabel: 'See the menu',
  ctaHref: '/shop',
  active: true,
};

const AUTOPLAY_MS = 6500;

const TICKER = [
  'OPEN TILL 12 AM',
  'MIRAROAD · THANE',
  'ARABIAN',
  'KOREAN',
  'TURKISH',
  'BOBA · MOJITO · SHAKES',
  'DELIVERY 8356915574',
];

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function HeroSlider() {
  const { settings } = useSettings();

  const slides = useMemo(() => {
    const configured = (settings.heroSlides ?? []).filter(
      (slide) => slide.active && (slide.imageUrl || slide.headline)
    );
    return configured.length ? configured : [FALLBACK_SLIDE];
  }, [settings.heroSlides]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const total = slides.length;
  const slide = slides[Math.min(index, total - 1)] ?? FALLBACK_SLIDE;

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total]
  );

  useEffect(() => {
    if (index > total - 1) setIndex(0);
  }, [index, total]);

  useEffect(() => {
    if (total < 2 || paused || prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [total, paused]);

  const tickerItems = [...TICKER, ...TICKER, ...TICKER, ...TICKER];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Tonight's plates"
      className="relative isolate overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(index + 1);
        if (event.key === 'ArrowLeft') go(index - 1);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
        if (Math.abs(delta) > 45) go(index + (delta < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className="relative h-[86vh] min-h-[560px] w-full sm:h-[90vh]">
        {/* Slides */}
        {slides.map((item, itemIndex) => {
          const isActive = itemIndex === index % total;
          const src = item.imageUrl?.startsWith('http') ? item.imageUrl : assetUrl(item.imageUrl);
          return (
            <div
              key={`${item.imageUrl}-${itemIndex}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-[900ms] ease-editorial ${
                isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              {src ? (
                <img
                  src={src}
                  alt={item.headline || 'Dudu Bubu fried chicken'}
                  className={`h-full w-full object-cover ${isActive ? 'animate-ken-burns' : ''}`}
                  loading={itemIndex === 0 ? 'eager' : 'lazy'}
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" />
            </div>
          );
        })}

        {/* Copy */}
        <div className="relative flex h-full items-end pb-28 sm:pb-32">
          <div className="shell w-full">
            <div key={index} className="max-w-3xl animate-fade-up">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge-chilli">Fresh out the fryer</span>
                <span className="text-[10px] font-semibold uppercase tracking-micro text-bone/70">
                  {slide.eyebrow || 'Miraroad, Thane'}
                </span>
              </div>

              <h1 className="mt-4 font-display text-[3.1rem] leading-[0.86] tracking-tight2 text-bone text-balance sm:text-7xl lg:text-[6.2rem]">
                {slide.headline || 'Fried. Glazed. Devoured.'}
              </h1>

              {slide.subheadline ? (
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-bone/75 sm:text-base">
                  {slide.subheadline}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to={slide.ctaHref || '/shop'} className="btn-chilli">
                  {slide.ctaLabel || 'See the menu'}
                </Link>
                <a
                  href={settings.instagramUrl || 'https://www.instagram.com/dudu_bubufried/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border-bone/40 text-bone hover:border-bone hover:bg-bone hover:text-ink"
                >
                  Tonight's specials
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical slide rail — the slider's signature control. */}
        {total > 1 ? (
          <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-1 border border-bone/20 bg-ink/40 p-1 backdrop-blur-sm md:flex lg:right-8">
            {slides.map((item, itemIndex) => {
              const isActive = itemIndex === index;
              return (
                <button
                  key={`rail-${itemIndex}`}
                  type="button"
                  onClick={() => go(itemIndex)}
                  aria-label={`Go to slide ${itemIndex + 1}`}
                  aria-current={isActive}
                  className={`group flex w-[13.5rem] items-center gap-3 px-3 py-3 text-left transition-colors ${
                    isActive ? 'bg-bone text-ink' : 'text-bone/70 hover:bg-bone/10 hover:text-bone'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-wide2">
                    {String(itemIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[10px] font-bold uppercase tracking-wide2">
                      {item.eyebrow || item.headline || `Slide ${itemIndex + 1}`}
                    </span>
                    <span
                      className={`mt-1 block h-[3px] w-full overflow-hidden ${
                        isActive ? 'bg-ink/15' : 'bg-bone/15'
                      }`}
                    >
                      {isActive ? (
                        <span
                          className="block h-full origin-left bg-chilli-500"
                          style={{
                            animation: prefersReducedMotion()
                              ? undefined
                              : `hero-progress ${AUTOPLAY_MS}ms linear both`,
                            animationPlayState: paused ? 'paused' : 'running',
                          }}
                        />
                      ) : null}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}

        {/* Circular arrows, bottom right */}
        {total > 1 ? (
          <div className="absolute bottom-28 right-4 flex gap-2 sm:bottom-32 lg:right-8">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(index - 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-bone/40 text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(index + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-bone/40 text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>

      {/* Marquee ticker */}
      <div className="relative border-y-2 border-bone/20 bg-chilli-600 py-2.5">
        <div className="ticker-mask overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
            {tickerItems.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-micro text-ivory"
              >
                {item}
                <span aria-hidden="true" className="text-ivory/50">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes hero-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { assetUrl } from '@/lib/brand';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
  onDark?: boolean;
  asLink?: boolean;
  className?: string;
}

const WORD: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-xl sm:text-2xl',
  md: 'text-3xl',
  lg: 'text-5xl sm:text-6xl',
};

const MARK: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-9 w-9 sm:h-10 sm:w-10',
  md: 'h-12 w-12',
  lg: 'h-20 w-20',
};

/**
 * The brand lockup: the studio's own Instagram emblem, unretouched, beside the
 * wordmark. Nothing is recoloured or stretched — the emblem is a circular
 * badge, so it is shown as a circle.
 */
export function Wordmark({
  size = 'md',
  withTagline = true,
  onDark = false,
  asLink = true,
  className = '',
}: Props) {
  const content = (
    <span className={`flex items-center gap-2.5 leading-none ${className}`}>
      <img
        src={assetUrl('/brand/logo.jpg')}
        alt=""
        aria-hidden="true"
        className={`${MARK[size]} shrink-0 rounded-full border border-ink/20 object-cover`}
        loading="eager"
      />
      <span className="flex flex-col items-start">
        <span
          className={`font-display uppercase leading-[0.9] tracking-tight2 ${WORD[size]} ${
            onDark ? 'text-bone' : 'text-ink'
          }`}
        >
          Dudu&nbsp;Bubu
        </span>
        {withTagline ? (
          <span
            className={`mt-1 text-[8px] font-semibold uppercase tracking-micro sm:text-[9px] ${
              onDark ? 'text-bone/60' : 'text-chilli-600'
            }`}
          >
            Fried Chicken · Thane
          </span>
        ) : null}
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link to="/" aria-label="DUDU BUBU FRIED CHICKEN — home" className="shrink-0">
      {content}
    </Link>
  );
}

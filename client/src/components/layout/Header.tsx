import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { Wordmark } from '@/components/Wordmark';

const NAV_ITEMS = [
  { to: '/shop', label: 'Menu' },
  { to: '/category/fried-chicken', label: 'Fried Chicken' },
  { to: '/category/shakes-boba', label: 'Shakes & Boba' },
  { to: '/about', label: 'The Kitchen' },
  { to: '/gallery', label: 'Feed' },
  { to: '/contact', label: 'Find Us' },
];

const HIGHLIGHT = new Set(['/shop']);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-bone/95 backdrop-blur-sm">
      {settings.announcements.enabled && settings.announcements.text ? (
        <div className="bg-chilli-600 px-4 py-2 text-center text-[10px] font-bold uppercase tracking-wide2 text-ivory">
          {settings.announcements.text}
        </div>
      ) : null}

      <div className="shell flex h-[76px] items-center justify-between gap-3 border-b-2 border-ink/10 sm:h-[84px]">
        <Wordmark size="sm" />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative text-[10px] font-bold uppercase tracking-wide2 transition-colors ${
                  isActive || HIGHLIGHT.has(item.to)
                    ? 'text-chilli-600'
                    : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <span className="hidden items-center gap-1.5 border border-ink/15 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wide2 text-ink-soft xl:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-herb-500" aria-hidden="true" />
            4 PM – 12 AM
          </span>

          <a
            href={settings.instagramUrl || 'https://www.instagram.com/dudu_bubufried/'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden p-2 text-ink-soft transition-colors hover:text-chilli-600 sm:block"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <button
            type="button"
            onClick={openCart}
            className="relative p-2 text-ink transition-opacity hover:opacity-60"
            aria-label={`Open bag (${count} items)`}
          >
            <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 8h14l-1 12H6L5 8z" />
              <path d="M9 8a3 3 0 016 0" />
            </svg>
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-chilli-500 px-1 text-[9px] font-bold text-ivory">
                {count}
              </span>
            ) : null}
          </button>

          <Link to="/shop" className="hidden border-2 border-ink bg-ink px-4 py-2 text-[10px] font-bold uppercase tracking-wide2 text-bone transition-colors hover:bg-chilli-600 sm:inline-block">
            Order
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="p-2 text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 8h16M4 16h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-b-2 border-ink/10 bg-bone px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block border-b border-ink/5 py-3.5 font-display text-2xl uppercase ${
                  isActive ? 'text-chilli-600' : 'text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <Link to="/reviews" className="text-[10px] font-bold uppercase tracking-wide2 text-ink-soft">
              Reviews
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-wide2 text-chilli-600">
              Open 4 PM – 12 AM
            </span>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

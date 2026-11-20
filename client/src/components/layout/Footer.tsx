import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Wordmark } from '@/components/Wordmark';
import { normaliseNumber } from '@/lib/whatsapp';

export function Footer() {
  const { settings } = useSettings();
  const whatsapp = normaliseNumber(settings.whatsappNumber);
  const instagram = settings.instagramUrl || 'https://www.instagram.com/dudu_bubufried/';

  return (
    <footer className="mt-24 border-t-2 border-ink/15 bg-ink text-bone">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:py-16">
        <div>
          <Wordmark size="md" asLink={false} onDark />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone/65">
            {settings.about.intro ||
              'Arabian, Korean and Turkish fried chicken out of Miraroad — fried to order and delivered till midnight.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="border border-bone/25 px-2 py-1 text-[9px] font-bold uppercase tracking-wide2 text-bone/70">
              Open 4 PM – 12 AM
            </span>
            <span className="border border-bone/25 px-2 py-1 text-[9px] font-bold uppercase tracking-wide2 text-bone/70">
              Delivery
            </span>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-micro text-bone/45">Menu</p>
          <ul className="mt-4 space-y-2.5 text-sm text-bone/70">
            <li><Link to="/shop" className="hover:text-bone">Everything</Link></li>
            <li><Link to="/category/fried-chicken" className="hover:text-bone">Fried chicken</Link></li>
            <li><Link to="/category/burgers-wraps" className="hover:text-bone">Burgers & wraps</Link></li>
            <li><Link to="/category/shakes-boba" className="hover:text-bone">Shakes & boba</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-micro text-bone/45">Kitchen</p>
          <ul className="mt-4 space-y-2.5 text-sm text-bone/70">
            <li><Link to="/about" className="hover:text-bone">Our story</Link></li>
            <li><Link to="/gallery" className="hover:text-bone">The feed</Link></li>
            <li><Link to="/reviews" className="hover:text-bone">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-bone">Delivery & contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-micro text-bone/45">Order</p>
          <ul className="mt-4 space-y-2.5 text-sm text-bone/70">
            {whatsapp ? (
              <li>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                  WhatsApp · {settings.whatsappNumber}
                </a>
              </li>
            ) : null}
            <li>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                Instagram · @{settings.instagramHandle.replace(/^@/, '')}
              </a>
            </li>
            {settings.email ? (
              <li><a href={`mailto:${settings.email}`} className="hover:text-bone">{settings.email}</a></li>
            ) : null}
            <li>{settings.city}{settings.city ? ', India' : ''}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bone/15">
        <div className="shell flex flex-col items-start justify-between gap-3 py-5 text-[10px] font-bold uppercase tracking-wide2 text-bone/40 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="hover:text-bone">Policies</Link>
            <Link to="/admin" className="hover:text-bone">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

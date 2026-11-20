import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { assetUrl, FOUNDER_IMAGE } from '@/lib/brand';

export function AboutPage() {
  const { settings } = useSettings();
  const story =
    settings.about.story ||
    'Dudu Bubu is a fried chicken counter in Miraroad, Thane, open from four in the afternoon until midnight.\\n\\nThe menu is short on purpose: chicken marinated overnight, dredged twice, fried hard to order, then finished three ways — Arabian spice, Korean gochujang and Turkish char. Around it, the things a late-night order actually needs: loaded fries, warm wraps, and something cold to drink.\\n\\nThere is no dining room philosophy here. Everything is packed to travel and sent out hot, and every order is confirmed personally over WhatsApp before it is made. If you are unsure how hot the Korean glaze runs, ask — we will tell you honestly.';
  const paragraphs = story.split('\\n').filter((paragraph) => paragraph.trim());

  return (
    <>
      <Seo
        title="The kitchen — DUDU BUBU FRIED CHICKEN"
        description="Dudu Bubu is a late-night fried chicken counter in Miraroad, Thane — Arabian, Korean and Turkish chicken, fried to order till midnight."
        canonicalPath="/about"
      />

      <section className="border-b-2 border-ink/10">
        <div className="shell py-14 sm:py-20">
          <p className="eyebrow">The kitchen</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl uppercase leading-[0.86] tracking-tight2 text-balance sm:text-7xl">
            One fryer. Three kitchens. Zero shortcuts.
          </h1>
          <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-wide2">
            <span className="border-2 border-ink/15 px-3 py-1.5 text-ink-soft">{settings.city || 'Thane'}, India</span>
            <span className="border-2 border-ink bg-ink px-3 py-1.5 text-bone">Open 4 PM – 12 AM</span>
            <span className="border-2 border-ink/15 px-3 py-1.5 text-ink-soft">Delivery only</span>
          </div>
        </div>
      </section>

      <section className="shell grid gap-10 py-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden border-2 border-ink/15 bg-sand">
            <img
              src={settings.about.founderImageUrl || assetUrl(FOUNDER_IMAGE)}
              alt="The Dudu Bubu kitchen in Miraroad"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-wide2 text-ink-faint">
            The pass — Miraroad, Thane
          </p>
        </div>

        <div className="prose-editorial lg:col-span-6 lg:col-start-7">
          <p className="eyebrow">Our story</p>
          <h2 className="mb-6 mt-3 font-display text-4xl uppercase leading-[0.94] tracking-tight2">
            {settings.about.intro || 'Fried fresh, madly addictive.'}
          </h2>
          {paragraphs.slice(0, 1).map((paragraph) => (
            <p key="first" className="text-base">{paragraph}</p>
          ))}
          {paragraphs.slice(1).map((paragraph, index) => (
            <p key={`rest-${index}`}>{paragraph}</p>
          ))}

          <div className="mt-8 border-t-2 border-ink/10 pt-6">
            <p className="text-[10px] font-bold uppercase tracking-micro text-chilli-600">
              Arabian · Korean · Turkish
            </p>
            <Link to="/shop" className="btn-chilli mt-4">
              See the menu
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-ink/10 bg-ivory py-14 sm:py-20">
        <div className="shell grid gap-4 sm:grid-cols-3">
          {[
            ['Twice dredged', 'Buttermilk brine overnight, then a double pass through seasoned flour for a shell that survives the ride.'],
            ['Glazed by hand', 'Korean gochujang and Arabian spice blends are tossed to order, never sitting in a warmer.'],
            ['Packed to travel', 'Vented boxes, sauces on the side — so the last dish is as crisp as the first.'],
          ].map(([title, text], index) => (
            <div key={title} className="border-2 border-ink/15 bg-bone p-6">
              <p className="font-mono text-[10px] text-chilli-600">0{index + 1}</p>
              <h3 className="mt-4 font-display text-2xl uppercase tracking-tight2">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-16">
        <div className="border-2 border-ink bg-fry-300 p-8 shadow-sticker sm:p-12">
          <p className="font-display text-3xl uppercase leading-[0.95] tracking-tight2 text-balance sm:text-4xl">
            “Freshly made. Madly addictive. That's the whole brief.”
          </p>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-micro text-ink/60">The kitchen note</p>
        </div>
      </section>
    </>
  );
}

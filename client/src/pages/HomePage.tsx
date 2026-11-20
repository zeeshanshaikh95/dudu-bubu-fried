import { Link } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { HeroSlider } from '@/components/HeroSlider';
import { ProductCard } from '@/components/ProductCard';
import { SectionIntro } from '@/components/SectionIntro';
import { Seo } from '@/components/seo/Seo';
import { EmptyState } from '@/components/EmptyState';
import { Stars } from '@/components/Stars';
import { assetUrl, FOUNDER_IMAGE } from '@/lib/brand';
import { buildOrderLink, buildSingleProductMessage } from '@/lib/whatsapp';

const KITCHENS = [
  {
    name: 'Arabian',
    note: 'Warm spice, crisp shell',
    text: 'Marinated overnight, dredged twice and fried hard — the crunch you hear across the room.',
  },
  {
    name: 'Korean',
    note: 'Sticky, sweet, hot',
    text: 'Gochujang glaze, sesame and spring onion. Sweet on the first bite, warm on the third.',
  },
  {
    name: 'Turkish',
    note: 'Charred, herbed, wrapped',
    text: 'Grilled strips and shavings rolled in warm bread with garlic sauce and pickled heat.',
  },
];

const PROMISES = [
  ['Fried to order', 'Nothing sits under a lamp. Your bucket hits the oil when you send the message.'],
  ['Open till midnight', '4 PM to 12 AM, seven days. Late cravings are the whole point.'],
  ['Delivered hot', 'Packed vented so it arrives crisp — Miraroad, Thane and around.'],
];

export function HomePage() {
  const { settings } = useSettings();
  const newIn = useApi(() => publicApi.listProducts({ sort: 'newest' }).then((r) => r.products), []);
  const bestsellers = useApi(() => publicApi.listProducts({ sort: 'bestseller' }).then((r) => r.products), []);
  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);
  const reviews = useApi(() => publicApi.listReviews().then((r) => r.reviews), []);
  const gallery = useApi(() => publicApi.listGallery().then((r) => r.items), []);

  const orderLink = buildOrderLink(
    settings,
    buildSingleProductMessage(settings, {
      productName: 'tonight’s order',
      variantName: null,
      quantity: 1,
      price: null,
    })
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: settings.businessName,
    servesCuisine: ['Arabian', 'Korean', 'Turkish', 'Fried Chicken'],
    description: settings.about.intro || 'Fried chicken, boba and shakes in Miraroad, Thane.',
    address: { '@type': 'PostalAddress', addressLocality: settings.city || 'Thane', addressCountry: 'IN' },
    openingHours: 'Mo-Su 16:00-24:00',
    ...(settings.instagramUrl ? { sameAs: [settings.instagramUrl] } : {}),
  };

  return (
    <>
      <Seo
        title="DUDU BUBU FRIED CHICKEN — Arabian · Korean · Turkish"
        description="Fried chicken out of the fryer till midnight in Miraroad, Thane. Arabian, Korean and Turkish plates, loaded fries, boba, mojito and shakes. Order on WhatsApp."
        canonicalPath="/"
        jsonLd={jsonLd}
      />

      <HeroSlider />

      {/* Promise strip */}
      <section className="border-b-2 border-ink/10 bg-ivory">
        <div className="shell grid divide-y-2 divide-ink/10 sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
          {PROMISES.map(([title, note], index) => (
            <div key={title} className="flex items-start gap-4 py-6 sm:px-6">
              <span className="mt-1 font-mono text-[10px] font-bold text-chilli-600">
                0{index + 1}
              </span>
              <div>
                <p className="font-display text-xl uppercase leading-none tracking-tight2">{title}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Straight out the fryer */}
      <section className="shell py-16 sm:py-20">
        <SectionIntro
          eyebrow="Just fried"
          title="Straight out the fryer"
          description="Tonight's board — new plates, new glazes, same twice-dredged crunch."
          linkTo="/shop?sort=newest"
          linkLabel="See the whole menu"
        />

        {newIn.loading ? (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton aspect-[4/5]" />
            ))}
          </div>
        ) : newIn.error ? (
          <div className="mt-10">
            <EmptyState tone="error" title="The menu didn't load" description={newIn.error} action={
              <button type="button" className="btn-line" onClick={newIn.refetch}>Try again</button>
            } />
          </div>
        ) : !newIn.data?.length ? (
          <div className="mt-10">
            <EmptyState
              title="The fryers are warming up"
              description="Tonight's plates appear here as soon as they're ready. Follow along on Instagram in the meantime."
            />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {newIn.data.slice(0, 4).map((product, index) => (
              <ProductCard key={product._id} product={product} priority={index < 2} />
            ))}
          </div>
        )}
      </section>

      {/* Categories — menu-board tiles */}
      <section className="border-y-2 border-ink/15 bg-ink py-16 text-bone sm:py-20">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-micro text-chilli-400">The board</p>
              <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] tracking-tight2 sm:text-5xl">
                Four ways to order
              </h2>
            </div>
            <Link to="/shop" className="text-[10px] font-bold uppercase tracking-wide2 text-bone/60 hover:text-bone">
              Everything →
            </Link>
          </div>

          {categories.loading ? (
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="aspect-[4/5] animate-pulse bg-bone/10" />
              ))}
            </div>
          ) : !categories.data?.length ? (
            <div className="mt-10 border-2 border-bone/20 p-10 text-center">
              <p className="font-display text-2xl uppercase">The menu is being written</p>
              <p className="mt-2 text-sm text-bone/60">Categories appear here once published from the admin panel.</p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {categories.data.slice(0, 4).map((category, index) => (
                <Link
                  key={category._id}
                  to={`/category/${category.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden border-2 border-bone/20 bg-bone/5"
                >
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-90 transition-all duration-[1100ms] ease-editorial group-hover:scale-105 group-hover:opacity-100"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-mono text-[10px] text-bone/50">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-1 font-display text-2xl uppercase leading-none tracking-tight2 text-bone">
                      {category.name}
                    </h3>
                    <span className="mt-3 inline-block border-b-2 border-chilli-500 pb-0.5 text-[9px] font-bold uppercase tracking-wide2 text-bone/80 transition-colors group-hover:text-chilli-400">
                      Order this
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Three kitchens */}
      <section className="shell py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">One counter, three kitchens</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-tight2 sm:text-5xl">
            Arabian spice. Korean glaze. Turkish char.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            The same chicken, taken three ways — because a craving is rarely specific. Pick a lane or
            build a bucket across all three.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {KITCHENS.map((kitchen, index) => (
            <div key={kitchen.name} className="border-2 border-ink/15 bg-ivory p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-3xl uppercase leading-none tracking-tight2">
                  {kitchen.name}
                </h3>
                <span className="font-mono text-[10px] text-chilli-600">0{index + 1}</span>
              </div>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wide2 text-fry-700">
                {kitchen.note}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{kitchen.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kitchen story */}
      <section className="border-y-2 border-ink/10 bg-ivory">
        <div className="shell grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden border-2 border-ink/15">
              <img
                src={settings.about.founderImageUrl || assetUrl(FOUNDER_IMAGE)}
                alt="The Dudu Bubu kitchen in Miraroad"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="sticker absolute -bottom-4 left-4">
              <span className="h-2 w-2 rounded-full bg-chilli-600" aria-hidden="true" />
              Fried fresh, 4 PM onwards
            </span>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow">The kitchen</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-tight2 sm:text-5xl">
              Late nights deserve better than this
            </h2>
            <p className="mt-5 text-sm leading-[1.85] text-ink-soft">
              {settings.about.intro ||
                'Dudu Bubu started with one fryer and a stubborn idea: the food you crave at midnight should still be worth eating. Everything is fried to order, glazed by hand and packed to travel.'}
            </p>
            <Link to="/about" className="btn-line mt-7">
              Read the kitchen story
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="shell py-16 sm:py-20">
        <SectionIntro
          eyebrow="Most ordered"
          title="What everyone keeps coming back for"
          linkTo="/shop?sort=bestseller"
          linkLabel="Shop bestsellers"
        />

        {bestsellers.loading ? (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton aspect-[4/5]" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {(bestsellers.data ?? []).slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Gallery */}
      {gallery.data?.length ? (
        <section className="shell pb-16 sm:pb-20">
          <SectionIntro
            eyebrow={`@${settings.instagramHandle.replace(/^@/, '')}`}
            title="From the feed"
            linkTo="/gallery"
            linkLabel="Open the feed"
          />
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {gallery.data.slice(0, 6).map((item) => (
              <a
                key={item._id}
                href={item.externalUrl || settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden border-2 border-ink/10 bg-sand"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.caption || 'Dudu Bubu on Instagram'}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                ) : null}
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25" />
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {/* Reviews */}
      <section className="shell pb-16 sm:pb-20">
        {reviews.data?.length ? (
          <>
            <SectionIntro eyebrow="Word of mouth" title="Devoured, then reviewed" linkTo="/reviews" linkLabel="All reviews" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {reviews.data.slice(0, 3).map((review) => (
                <figure key={review._id} className="panel flex flex-col p-6">
                  <Stars rating={review.rating} />
                  <blockquote className="mt-4 flex-1 text-lg leading-snug text-ink">“{review.text}”</blockquote>
                  <figcaption className="mt-5 text-[10px] font-bold uppercase tracking-wide2 text-ink-faint">
                    {review.customerName}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        ) : null}
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden border-y-2 border-ink/20 bg-chilli-600 py-20 text-ivory sm:py-28">
        <div className="shell relative flex flex-col items-start">
          <p className="text-[10px] font-bold uppercase tracking-micro text-ivory/70">
            {settings.city ? `${settings.city} · ` : ''}Delivering till midnight
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.88] tracking-tight2 text-balance sm:text-6xl lg:text-7xl">
            Send the message. We'll start the fryer.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ivory/80">
            Tell us what you want and where you are — we'll confirm the plate, the price and the
            delivery time before anything goes in the oil.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {orderLink ? (
              <a
                href={orderLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-ink bg-ink text-ivory hover:bg-ivory hover:text-ink"
              >
                {orderLink.channel === 'whatsapp' ? 'Order on WhatsApp' : 'DM to order'}
              </a>
            ) : null}
            <Link to="/shop" className="btn border-ivory/50 text-ivory hover:bg-ivory hover:text-chilli-600">
              Browse the menu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

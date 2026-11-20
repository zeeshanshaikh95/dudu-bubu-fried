import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { buildOrderLink, buildSingleProductMessage, normaliseNumber } from '@/lib/whatsapp';

export function ContactPage() {
  const { settings } = useSettings();
  const whatsapp = normaliseNumber(settings.whatsappNumber);

  const orderLink = buildOrderLink(
    settings,
    buildSingleProductMessage(settings, {
      productName: 'tonight’s order',
      variantName: null,
      quantity: 1,
      price: null,
    })
  );

  const channels = [
    {
      label: 'WhatsApp',
      value: whatsapp ? settings.whatsappNumber : 'Add a number in Admin → Settings',
      href: whatsapp ? `https://wa.me/${whatsapp}` : null,
      note: 'Orders, spice levels and delivery timing, answered personally.',
    },
    {
      label: 'Instagram',
      value: `@${settings.instagramHandle.replace(/^@/, '')}`,
      href: settings.instagramUrl || 'https://www.instagram.com/dudu_bubufried/',
      note: 'DMs are open — the fastest way to see what came off the fryer tonight.',
    },
    {
      label: 'Hours',
      value: '4 PM – 12 AM',
      href: null as string | null,
      note: 'Seven days a week. Last orders taken at 11:45 PM.',
    },
  ];

  return (
    <>
      <Seo
        title="Find us — DUDU BUBU FRIED CHICKEN"
        description="Order Dudu Bubu fried chicken in Miraroad, Thane on WhatsApp. Open 4 PM to 12 AM, delivery across Miraroad and nearby."
        canonicalPath="/contact"
      />

      <section className="border-b-2 border-ink/10">
        <div className="shell py-14 sm:py-20">
          <p className="eyebrow">Find us</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl uppercase leading-[0.88] tracking-tight2 text-balance sm:text-7xl">
            Message first. We'll start frying.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">
            A person reads every message. Tell us what you want, how hot you can take it and where you
            are — we'll confirm the price and the delivery window before anything hits the oil.
          </p>
        </div>
      </section>

      <div className="shell grid gap-4 py-12 sm:py-16 md:grid-cols-3">
        {channels.map((channel) => (
          <div key={channel.label} className="border-2 border-ink/15 bg-ivory p-6 sm:p-8">
            <p className="eyebrow">{channel.label}</p>
            {channel.href ? (
              <a
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="mt-4 block font-display text-2xl uppercase tracking-tight2 hover:text-chilli-600"
              >
                {channel.value}
              </a>
            ) : (
              <p className="mt-4 font-display text-2xl uppercase tracking-tight2 text-ink">{channel.value}</p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{channel.note}</p>
          </div>
        ))}
      </div>

      <section className="shell grid gap-10 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl uppercase tracking-tight2">Delivery & your order</h2>
          <div className="prose-editorial mt-4">
            {settings.policies.shipping ? (
              <p className="whitespace-pre-line">{settings.policies.shipping}</p>
            ) : (
              <p>
                We deliver across Miraroad, Thane and the surrounding area. Once your order is confirmed
                on WhatsApp we share a delivery window — no automated emails, just a message from us.
              </p>
            )}
            {settings.policies.returns ? (
              <p className="whitespace-pre-line">{settings.policies.returns}</p>
            ) : (
              <p>
                Food is made to order, so we cannot take returns. If something arrives wrong, cold or
                missing, message the same number within the hour with a photo and we will fix it.
              </p>
            )}
          </div>

          <div className="mt-8 border-2 border-ink/15 bg-ivory p-6">
            <p className="eyebrow">Allergies</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Everything is fried in shared oil and several dishes contain gluten, dairy, egg and
              sesame. Tell us about an allergy before you order and we will tell you honestly whether
              we can serve you safely.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="border-2 border-ink bg-ink p-6 text-bone">
            <p className="text-[10px] font-bold uppercase tracking-micro text-bone/45">The kitchen</p>
            <p className="mt-3 font-display text-2xl uppercase leading-none tracking-tight2">
              {settings.city || 'Thane'}, India
            </p>
            <p className="mt-3 text-sm leading-relaxed text-bone/65">
              Miraroad. Delivery only — there is no dining room, so the food travels straight from the
              pass to you.
            </p>
            <p className="mt-4 border-t border-bone/15 pt-4 text-[10px] font-bold uppercase tracking-wide2 text-bone/60">
              Open daily 4 PM – 12 AM
            </p>
            {orderLink ? (
              <a
                href={orderLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-5 w-full border-bone bg-bone text-ink hover:bg-chilli-600 hover:text-ivory"
              >
                {orderLink.channel === 'whatsapp' ? 'Order on WhatsApp' : 'DM to order'}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

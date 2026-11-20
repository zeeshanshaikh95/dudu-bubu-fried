import mongoose, { Schema, model, type Model } from 'mongoose';

export interface IHeroSlide {
  imageUrl: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  active: boolean;
}

export const HERO_SLIDES_DEFAULT: IHeroSlide[] = [
  {
    imageUrl: '/images/hero-fryer.jpg',
    eyebrow: 'Miraroad, Thane · 4 PM – 12 AM',
    headline: 'Fried. Glazed. Devoured.',
    subheadline:
      'Arabian, Korean and Turkish fried chicken, out of the fryer to your door — plus boba and shakes to put the fire out.',
    ctaLabel: 'See the menu',
    ctaHref: '/shop',
    active: true,
  },
  {
    imageUrl: '/images/hero-wings.jpg',
    eyebrow: 'Korean glaze · 12 pieces',
    headline: 'Sticky, sweet, then hot.',
    subheadline:
      'Gochujang-tossed wings finished with sesame and spring onion. Sweet on the first bite, warm on the third.',
    ctaLabel: 'Order the wings',
    ctaHref: '/category/fried-chicken',
    active: true,
  },
  {
    imageUrl: '/images/hero-shakes.jpg',
    eyebrow: 'Boba · Mojito · Shakes',
    headline: 'Something cold to put it out.',
    subheadline:
      'Thick shakes, brown-sugar boba and crushed-ice mojitos — the other half of a midnight order.',
    ctaLabel: 'Drinks menu',
    ctaHref: '/category/shakes-boba',
    active: true,
  },
];

export const WHATSAPP_TEMPLATE_DEFAULT =
  'Hi DUDU BUBU! 🍗\n' +
  'I would like to order:\n' +
  '{{ITEMS}}\n' +
  'Estimated total: {{TOTAL}}\n\n' +
  'Please confirm availability, price and delivery time.';

export const WHATSAPP_TEMPLATE_SINGLE_DEFAULT =
  'Hi DUDU BUBU! 🍗\n' +
  'I would like to ask about:\n' +
  '• {{PRODUCT}}\n' +
  '{{VARIANT_LINE}}{{QTY_LINE}}Price: {{PRICE}}\n\n' +
  'Please confirm availability and delivery time.';

export interface ISiteSettings {
  businessName: string;
  tagline: string;
  whatsappNumber: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  city: string;
  mapsUrl: string;
  whatsappTemplate: string;
  whatsappSingleProductTemplate: string;
  heroSlides: IHeroSlide[];
  about: {
    intro: string;
    story: string;
    founderImageUrl: string;
  };
  announcements: {
    enabled: boolean;
    text: string;
  };
  policies: {
    shipping: string;
    returns: string;
  };
  updatedAt: Date;
}

const slideSchema = new Schema<IHeroSlide>(
  {
    imageUrl: { type: String, default: '' },
    eyebrow: { type: String, default: '' },
    headline: { type: String, default: '' },
    subheadline: { type: String, default: '' },
    ctaLabel: { type: String, default: 'See the menu' },
    ctaHref: { type: String, default: '/shop' },
    active: { type: Boolean, default: true },
  },
  { _id: false }
);

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: 'DUDU BUBU' },
    tagline: { type: String, default: 'Fried Chicken · Arabian · Korean · Turkish' },
    whatsappNumber: { type: String, default: '+91 83569 15574' },
    instagramUrl: { type: String, default: 'https://www.instagram.com/dudu_bubufried/' },
    instagramHandle: { type: String, default: 'dudu_bubufried' },
    email: { type: String, default: '' },
    city: { type: String, default: 'Thane' },
    mapsUrl: { type: String, default: '' },
    whatsappTemplate: { type: String, default: WHATSAPP_TEMPLATE_DEFAULT },
    whatsappSingleProductTemplate: { type: String, default: WHATSAPP_TEMPLATE_SINGLE_DEFAULT },
    heroSlides: { type: [slideSchema], default: () => HERO_SLIDES_DEFAULT },
    about: {
      intro: {
        type: String,
        default:
          'Arabian, Korean and Turkish fried chicken out of Miraroad — fried to order and delivered till midnight.',
      },
      story: { type: String, default: '' },
      founderImageUrl: { type: String, default: '/images/kitchen.jpg' },
    },
    announcements: {
      enabled: { type: Boolean, default: true },
      text: {
        type: String,
        default: 'Open 4 PM – 12 AM · Delivery in Miraroad, Thane · 83569 15574',
      },
    },
    policies: {
      shipping: {
        type: String,
        default:
          'Delivery across Miraroad, Thane and nearby. Orders are confirmed on WhatsApp with a delivery window before they are fried.',
      },
      returns: {
        type: String,
        default:
          'Food is made to order, so we cannot take returns. If something arrives wrong or cold, message us on the same number and we will fix it.',
      },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ?? model<ISiteSettings>('SiteSettings', siteSettingsSchema);

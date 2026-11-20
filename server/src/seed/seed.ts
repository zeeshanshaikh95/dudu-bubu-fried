/**
 * Seeds the database.
 *
 *   npm run seed          → bootstrap admin + settings, then add the starter
 *                           menu only when no products exist yet
 *   npm run seed:reset    → wipe catalogue records and re-create them
 *
 * Menu structure comes from the brand's own Instagram bio and posts:
 * "Arabian · Korean · Turkish", "Boba · Mojito · Shakes", delivery 8356915574,
 * open 4 PM – 12 AM, Miraroad, Thane. Her feed publishes no prices, so every
 * price is null ("Ask for price") rather than invented — set real prices in
 * Admin → Products whenever she shares them.
 */
import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Category } from '../models/category.model.js';
import { GalleryItem } from '../models/galleryItem.model.js';
import { Product } from '../models/product.model.js';
import { Review } from '../models/review.model.js';
import { bootstrap } from './bootstrap.js';

const reset = process.argv.includes('--reset');
const IG = 'https://www.instagram.com/dudu_bubufried/';

const categories = [
  {
    name: 'Fried Chicken',
    slug: 'fried-chicken',
    description: 'Arabian spice, Korean glaze, Turkish char — buckets, wings and strips, fried to order.',
    image: '/images/dish-bucket.jpg',
    displayOrder: 1,
  },
  {
    name: 'Burgers & Wraps',
    slug: 'burgers-wraps',
    description: 'Buttermilk-fried fillets in soft buns and warm bread, with slaw, pickles and garlic sauce.',
    image: '/images/dish-wrap.jpg',
    displayOrder: 2,
  },
  {
    name: 'Sides & Fries',
    slug: 'sides-fries',
    description: 'Loaded fries and the small things that finish a bucket.',
    image: '/images/dish-fries.jpg',
    displayOrder: 3,
  },
  {
    name: 'Shakes & Boba',
    slug: 'shakes-boba',
    description: 'Thick shakes, brown-sugar boba and crushed-ice mojitos — the cold half of the order.',
    image: '/images/hero-shakes.jpg',
    displayOrder: 4,
  },
];

const variants = (names: string[]) =>
  names.map((name) => ({ name, price: null as number | null, stockStatus: 'in_stock' as const }));

const products = [
  {
    name: 'Arabian Crispy Chicken',
    slug: 'arabian-crispy-chicken',
    description:
      'The house bucket. Chicken brined overnight in buttermilk, dredged twice and fried hard, then dusted with a warm Arabian spice blend — cumin, coriander, sumac and a little dried lime. Order it quarter, half or full.',
    price: null,
    compareAtPrice: null,
    fabric: 'Chicken, buttermilk brine, seasoned flour, cumin, coriander, sumac, dried lime, garlic',
    care: 'Contains gluten and dairy. Fried in shared oil — ask us about allergens before ordering.',
    colour: 'Medium heat',
    categorySlug: 'fried-chicken',
    images: ['/images/dish-bucket.jpg', '/images/hero-fryer.jpg'],
    variants: variants(['Quarter', 'Half', 'Full']),
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 1,
  },
  {
    name: 'Korean Gochujang Wings',
    slug: 'korean-gochujang-wings',
    description:
      'Wings fried twice for a shell that holds its crunch, then tossed to order in a gochujang glaze with honey, garlic and sesame. Finished with spring onion. Sweet first, warm after.',
    price: null,
    compareAtPrice: null,
    fabric: 'Chicken wings, gochujang, honey, garlic, sesame oil, sesame seeds, spring onion',
    care: 'Contains soy, sesame and gluten. Glazed to order — please mention a sesame allergy.',
    colour: 'Hot',
    categorySlug: 'fried-chicken',
    images: ['/images/dish-wings.jpg', '/images/hero-wings.jpg'],
    variants: variants(['6 pieces', '12 pieces']),
    bestseller: true,
    featured: true,
    newArrival: true,
    displayOrder: 2,
  },
  {
    name: 'Turkish Chicken Strips',
    slug: 'turkish-chicken-strips',
    description:
      'Char-grilled strips in a herbed Turkish marinade — oregano, chilli flakes, yoghurt and lemon — sliced thick and served with garlic sauce for dipping.',
    price: null,
    compareAtPrice: null,
    fabric: 'Chicken breast, yoghurt, oregano, chilli flakes, lemon, garlic, olive oil',
    care: 'Contains dairy. Grilled separately from the fried items.',
    colour: 'Mild',
    categorySlug: 'fried-chicken',
    images: ['/images/dish-strips.jpg'],
    variants: variants(['Regular', 'Large']),
    bestseller: false,
    featured: false,
    newArrival: true,
    displayOrder: 3,
  },
  {
    name: 'Dudu Chicken Burger',
    slug: 'dudu-chicken-burger',
    description:
      'A buttermilk-fried fillet in a toasted bun with slaw, pickles, cheese and the house chilli mayo. Ask for the double if you are hungry enough.',
    price: null,
    compareAtPrice: null,
    fabric: 'Chicken fillet, brioche bun, slaw, pickles, cheese, chilli mayo',
    care: 'Contains gluten, dairy and egg. Made to order — allow a little longer at peak time.',
    colour: 'Medium heat',
    categorySlug: 'burgers-wraps',
    images: ['/images/dish-burger.jpg'],
    variants: variants(['Single', 'Double']),
    bestseller: false,
    featured: true,
    newArrival: false,
    displayOrder: 4,
  },
  {
    name: 'Turkish Chicken Wrap',
    slug: 'turkish-chicken-wrap',
    description:
      'Grilled chicken strips rolled in warm flatbread with garlic sauce, shredded cabbage, pickled onion and a squeeze of lemon. The easiest thing to eat on the way home.',
    price: null,
    compareAtPrice: null,
    fabric: 'Chicken strips, flatbread, garlic sauce, cabbage, pickled onion, lemon',
    care: 'Contains gluten, dairy and egg.',
    colour: 'Mild',
    categorySlug: 'burgers-wraps',
    images: ['/images/dish-wrap.jpg'],
    variants: variants(['Regular', 'Large']),
    bestseller: true,
    featured: false,
    newArrival: false,
    displayOrder: 5,
  },
  {
    name: 'Loaded Masala Fries',
    slug: 'loaded-masala-fries',
    description:
      'Fries tossed in house masala, then loaded with cheese sauce, fried chicken bits, spring onion and a drizzle of chilli mayo. Get the peri-peri version if you want it louder.',
    price: null,
    compareAtPrice: null,
    fabric: 'Potatoes, house masala, cheese sauce, chicken, spring onion, chilli mayo',
    care: 'Contains dairy and egg. Vegetarian version available without the chicken.',
    colour: 'Medium heat',
    categorySlug: 'sides-fries',
    images: ['/images/dish-fries.jpg'],
    variants: variants(['Regular', 'Peri peri', 'Cheese loaded']),
    bestseller: true,
    featured: false,
    newArrival: true,
    displayOrder: 6,
  },
  {
    name: 'Brown Sugar Boba Shake',
    slug: 'brown-sugar-boba-shake',
    description:
      'Cold milk, brown sugar syrup and tapioca pearls, shaken thick and finished with a caramel swirl. The reason people order two.',
    price: null,
    compareAtPrice: null,
    fabric: 'Milk, brown sugar syrup, tapioca pearls, cream, caramel',
    care: 'Contains dairy. Pearls are prepared fresh and are best drunk within the hour.',
    colour: 'Sweet',
    categorySlug: 'shakes-boba',
    images: ['/images/dish-boba.jpg', '/images/hero-shakes.jpg'],
    variants: variants(['Regular', 'Large']),
    bestseller: true,
    featured: true,
    newArrival: true,
    displayOrder: 7,
  },
  {
    name: 'Blue Lagoon Mojito',
    slug: 'blue-lagoon-mojito',
    description:
      'Crushed ice, fresh mint, lime and blue curaçao syrup, topped with soda. Non-alcoholic, very cold, and the fastest way to cool down after the Korean glaze.',
    price: null,
    compareAtPrice: null,
    fabric: 'Mint, lime, blue curaçao syrup, soda, crushed ice',
    care: 'Alcohol-free. Contains no dairy or gluten.',
    colour: 'Cooling',
    categorySlug: 'shakes-boba',
    images: ['/images/dish-mojito.jpg'],
    variants: variants(['Regular', 'Large']),
    bestseller: false,
    featured: false,
    newArrival: true,
    displayOrder: 8,
  },
];

const gallery = [
  { image: '/images/hero-fryer.jpg', caption: 'Straight out the fryer', externalUrl: IG, displayOrder: 1 },
  { image: '/images/dish-wings.jpg', caption: 'Gochujang wings, tossed to order', externalUrl: IG, displayOrder: 2 },
  { image: '/images/hero-shakes.jpg', caption: 'Boba, mojito and thick shakes', externalUrl: IG, displayOrder: 3 },
  { image: '/images/dish-bucket.jpg', caption: 'The house bucket', externalUrl: IG, displayOrder: 4 },
  { image: '/images/dish-wrap.jpg', caption: 'Turkish wrap, wrapped warm', externalUrl: IG, displayOrder: 5 },
  { image: '/images/kitchen.jpg', caption: 'The pass at Miraroad', externalUrl: IG, displayOrder: 6 },
];

async function main(): Promise<void> {
  await connectDatabase();
  await bootstrap();

  const existingProducts = await Product.countDocuments();
  if (existingProducts > 0 && !reset) {
    console.log(`[seed] ${existingProducts} products already present — menu seed skipped`);
  } else {
    if (reset) {
      await Promise.all([
        Product.deleteMany({}),
        Category.deleteMany({}),
        Review.deleteMany({}),
        GalleryItem.deleteMany({}),
      ]);
      console.log('[seed] catalogue cleared');
    }

    const categoryIds = new Map<string, mongoose.Types.ObjectId>();
    for (const category of categories) {
      const created = await Category.create(category);
      categoryIds.set(category.slug, created._id as mongoose.Types.ObjectId);
    }
    console.log(`[seed] ${categories.length} categories created`);

    for (const product of products) {
      const { categorySlug, ...rest } = product;
      await Product.create({
        ...rest,
        category: categoryIds.get(categorySlug) ?? null,
      });
    }
    console.log(`[seed] ${products.length} menu items created`);

    await GalleryItem.create(gallery);
    console.log(`[seed] ${gallery.length} gallery images created`);

    console.log('[seed] reviews are left empty — add real customer words in Admin → Reviews');
  }

  await disconnectDatabase();
  console.log('[seed] done');
}

main().catch(async (err) => {
  console.error('[seed] failed', err);
  await disconnectDatabase().catch(() => undefined);
  process.exit(1);
});

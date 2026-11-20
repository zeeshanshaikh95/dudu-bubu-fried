import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { formatPrice, truncate } from '@/lib/format';
import type { Product } from '@/types';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart();
  const outOfStock = product.stockStatus === 'out_of_stock';
  const secondary = product.images[1];

  return (
    <article className="group">
      <div className="relative overflow-hidden border-2 border-ink/10 bg-sand">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden">
            {product.images[0] ? (
              <>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading={priority ? 'eager' : 'lazy'}
                  className={`h-full w-full object-cover transition-all duration-[900ms] ease-editorial group-hover:scale-[1.04] ${
                    secondary ? 'group-hover:opacity-0' : ''
                  }`}
                />
                {secondary ? (
                  <img
                    src={secondary}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                ) : null}
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="font-display text-4xl text-ink/20">{product.name.slice(0, 2)}</span>
              </div>
            )}
          </div>
        </Link>

        <div className="absolute left-0 top-0 flex flex-col gap-1 p-2">
          {product.newArrival ? <span className="badge-chilli">New</span> : null}
          {product.bestseller ? <span className="badge-fry">Most ordered</span> : null}
          {outOfStock ? <span className="badge-line">Sold out</span> : null}
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 ease-editorial group-hover:translate-y-0">
          <button
            type="button"
            disabled={outOfStock}
            onClick={() => addItem(product)}
            className="w-full bg-ink py-2.5 text-[10px] font-bold uppercase tracking-wide2 text-bone transition-colors hover:bg-chilli-600 disabled:opacity-50"
          >
            {outOfStock ? 'Sold out' : 'Add to bag'}
          </button>
        </div>
      </div>

      <div className="pt-3">
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="font-display text-xl uppercase leading-none tracking-tight2 text-ink transition-colors hover:text-chilli-600">
            {truncate(product.name, 52)}
          </h3>
        </Link>
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide2 text-ink-faint">
            {product.category?.name ?? (product.colour || 'DUDU BUBU')}
          </p>
          <p className="text-xs font-semibold text-ink-soft">{formatPrice(product.price)}</p>
        </div>
      </div>
    </article>
  );
}

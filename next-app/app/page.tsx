import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './products.module.scss';
import { fetchProducts } from '@/lib/services/products';

export default async function Home() {
  const data = await fetchProducts(12);
  const products = data.products;
  return (
    <div>
      <div className={styles.titleRow}>
        <h1>Products</h1>
      </div>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

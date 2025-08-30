"use client";
import Image from 'next/image';
import styles from './ProductCard.module.scss';
import type { Product } from '@/src/types/api';
import { useAuthStore } from '@/store/auth';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { user } = useAuthStore();
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image src={product.thumbnail} alt={product.title} fill sizes="(max-width: 600px) 100vw, 33vw" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.meta}>{product.category}</div>
        <div className={styles.row}>
          <div>${product.price}</div>
          {user && (
            <button className={styles.button} type="button">
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



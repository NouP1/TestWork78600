"use client";
import { useMemo } from 'react';
import { useAuthStore } from '@/store/auth';
import styles from './Footer.module.scss';

export default function Footer() {
  const { user } = useAuthStore();
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className={styles.footer}>
      <div className="container">
        {user ? `© ${year} — Logged as ${user.email}` : `© ${year}`}
      </div>
    </footer>
  );
}



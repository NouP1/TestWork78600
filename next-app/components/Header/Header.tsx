"use client";
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import styles from './Header.module.scss';

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link href="/">DummyShop</Link>
      </div>
      <div className={styles.actions}>
        {user ? (
          <>
            <span>
              {user.firstName} {user.lastName}
            </span>
            <button className={styles.linkButton} onClick={logout} type="button">
              Logout
            </button>
          </>
        ) : (
          <Link className={styles.linkButton} href="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}



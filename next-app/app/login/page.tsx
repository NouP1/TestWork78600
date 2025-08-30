"use client";
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import styles from './page.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error, user } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  if (user) {
    router.replace('/');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const u = username.trim();
    const p = password.trim();
    if (!u || u.length < 3 || !p || p.length < 3) {
      setFormError('Username and password must be at least 3 characters.');
      return;
    }
    try {
      await login(u, p);
      router.replace('/');
    } catch {
    }
  }

  return (
    <div className={styles.wrap}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="kminchelle"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="0lelplR"
          />
        </div>
        {(formError || error) && <div className={styles.error}>{formError || error}</div>}
        <div className={styles.actions}>
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}



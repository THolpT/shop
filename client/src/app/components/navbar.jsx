'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const refresh = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCount(cart.reduce((s, i) => s + (i.qty || 1), 0));
      setTotal(cart.reduce((s, i) => s + i.price * (i.qty || 1), 0));
    } catch {
      setCount(0);
      setTotal(0);
    }
  };

  useEffect(() => {
    refresh();
    window.addEventListener('cart-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('cart-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="container navbar_inner">
        <Link href="/" className="brand">
          Shop
        </Link>

        <Link href="/cart" className="cart-btn">
          Корзина
          <span className="cart-btn_badge">{count}</span>
          <span style={{ opacity: 0.7 }}>·</span>
          <span>{total.toLocaleString('ru-RU')} ₽</span>
        </Link>
      </div>
    </header>
  );
}
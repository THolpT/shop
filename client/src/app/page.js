'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Product from './components/product';

const API_URL = 'http://localhost:5297/api/Product?page=1&pageSize=20';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const items = Array.isArray(data)
          ? data
          : data.items || data.data || data.products || [];
        setProducts(items);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((i) => i.id === product.id);
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <>
      <Navbar />

      <main className="container" style={{ paddingBottom: 60 }}>
        <div className="page-head">
          <div>
            <h1>Товары</h1>
            <p>
              {loading
                ? 'Загрузка каталога…'
                : `${products.length} товаров в каталоге`}
            </p>
          </div>
        </div>

        {loading && (
          <div className="grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton" />
            ))}
          </div>
        )}

        {error && (
          <div className="state">
            Не удалось загрузить товары: <b>{error}</b>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="state">Товаров пока нет.</div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid">
            {products.map((p) => (
              <Product key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
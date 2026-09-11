'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    setReady(true);
  }, []);

  const persist = (next) => {
    setCart(next);
    localStorage.setItem('cart', JSON.stringify(next));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const inc = (id) =>
    persist(cart.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));

  const dec = (id) =>
    persist(
      cart
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );

  const remove = (id) => persist(cart.filter((i) => i.id !== id));
  const clear = () => persist([]);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <Navbar />

      <main className="container" style={{ paddingBottom: 60 }}>
        <div className="page-head">
          <div>
            <h1>Корзина</h1>
            <p>
              {count > 0
                ? `${count} позиций на сумму ${total.toLocaleString('ru-RU')} ₽`
                : 'Пока пусто'}
            </p>
          </div>
          <Link href="/" className="btn btn-ghost">
            ← К товарам
          </Link>
        </div>

        {!ready ? null : cart.length === 0 ? (
          <div className="state">

            Здесь пока пусто.
            <div style={{ marginTop: 16 }}>
              <Link href="/" className="btn btn-primary">
                За покупками
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {cart.map((i) => {
                const img = i.imageUrl || i.image || i.pictureUrl || '';
                return (
                  <div key={i.id} className="cart-row">
                    {img ? (
                      <img className="cart-row_img" src={img} alt={i.name} />
                    ) : (
                      <div className="cart-row_img" />
                    )}

                    <div>
                      <div className="cart-row_name">{i.name}</div>
                      <div className="cart-row_price">
                        {i.price.toLocaleString('ru-RU')} ₽ / шт
                      </div>
                    </div>

                    <div className="qty">
                      <button onClick={() => dec(i.id)} aria-label="Уменьшить">
                        −
                      </button>
                      <span>{i.qty}</span>
                      <button onClick={() => inc(i.id)} aria-label="Увеличить">
                        +
                      </button>
                    </div>

                    <div
                      style={{
                        fontWeight: 700,
                        minWidth: 90,
                        textAlign: 'right',
                      }}
                    >
                      {(i.price * i.qty).toLocaleString('ru-RU')} ₽
                    </div>

                    <button
                      className="icon-btn"
                      onClick={() => remove(i.id)}
                      aria-label="Удалить"
                      title="Удалить"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            <aside className="summary">
              <h3>Итого</h3>
              <div className="summary_row">
                <span>Позиций</span>
                <span>{count}</span>
              </div>
              <div className="summary_row">
                <span>Товаров</span>
                <span>{cart.length}</span>
              </div>
              <div className="summary_row total">
                <span>Сумма</span>
                <span>{total.toLocaleString('ru-RU')} ₽</span>
              </div>

              <button className="btn btn-primary">Оформить заказ</button>
              <button
                className="btn btn-danger"
                style={{ marginTop: 10 }}
                onClick={clear}
              >
                Очистить корзину
              </button>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}
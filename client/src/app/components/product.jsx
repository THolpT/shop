'use client';

export default function Product({ product, onAdd }) {
  return (
    <article className="card">
      <div className="card_media">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              placeItems: 'center',
              color: '#94a3b8',
              fontSize: 13,
            }}
          >
            Нет изображения
          </div>
        )}
      </div>

      <div className="card_body">
        <h3 className="card_title">{product.title}</h3>
        {product.description && (
          <p className="card_desc">{product.description}</p>
        )}

        <div className="card_footer">
          <span className="price">{product.price} ₽</span>
          <button className="btn btn-primary" onClick={() => onAdd(product)}>
            В корзину
          </button>
        </div>
      </div>
    </article>
  );
}
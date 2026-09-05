

export default function Product({ product }) {
  return (
    <div>
        <img src={product.ImageUrl} alt="img" />
        <p>{product.Title}</p>
        <p>{product.Description}</p>
        <p>{product.Price}</p>
    </div>
  );
}

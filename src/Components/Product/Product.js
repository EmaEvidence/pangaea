import './Product.css';

const Product = (props) => {
  const {product, addToCart} = props;
  return (
    <div className="product">
      <img src={product.image_url} alt={product.title} />
      <span>{product.title}</span>
      <span>From {props.currency} {product.price}</span>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;

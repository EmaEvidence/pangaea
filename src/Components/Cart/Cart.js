import React from 'react';
import './Cart.css';

const Cart = (props) => {
  const {
    toggleCart,
    increaseQty,
    removeFromCart,
    decreaseQty,
    addToCart,
    cartItems,
    currency,
    currencies,
    setCurrency,
    priceMap
} = props;

const calculateCartTotal = () => {
  let total = 0;
  cartItems.forEach(item => {
    total += item.quantity * priceMap[item.id];
  });
  return total;
}

  return (
    <div className="cart">
      <button className="close-btn" onClick={() => toggleCart(false)}>{'>'}</button>
      <span>Your Cart</span>
      <select value={currency} onChange={({target}) => setCurrency(target.value)}>
        {
          currencies && currencies.map((item) =><option>{item}</option>)
        }
      </select>
      <div className="item-container">
        {
          cartItems.map((item, index) => (
            <CartItem
              item={item}
              key={`${item}${item.name}`}
              increaseQty={increaseQty}
              removeFromCart={removeFromCart}
              decreaseQty={decreaseQty}
              addToCart={addToCart}
              currency={currency}
              price={priceMap[item.id]}
            />
          ))
        }
      </div>
      <div className="cart-footer">
        <div className="cost-container">
          <span>Subtotal</span>
          <span>{currency} {calculateCartTotal()}</span>
        </div>
        <button>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;

const CartItem = (props) => {
  const {
    increaseQty,
    removeFromCart,
    decreaseQty,
    item,
    currency,
    price
} = props;
  return (
    <div className="cart-item">
      <div className="content">
        <span>{item.title}</span>
        <div className="price-container">
          <div className="qty-control">
            <button onClick={() => decreaseQty(item)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(item)}>+</button>
          </div>
          <span>{currency} {(item.quantity * price) || 'loading'}</span>
        </div>
      </div>
      <div className="image-wrapper">
        <img src={item.image_url} alt={item.title} />
      </div>
      <button className="remove-btn" onClick={() => removeFromCart(item)}>x</button>
    </div>
  )
}

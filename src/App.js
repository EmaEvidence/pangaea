import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import './App.css';
import Banner from './Components/Banner/Banner';
import NavBar from './Components/NavBar/NavBar';
import ProductList from './Components/ProductsList/ProductList';
import Cart from './Components/Cart/Cart';

const GET_PRODUCTS = gql`
  query GetProducts($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
    currency
  }
`;

function App() {
  const [isCartOpen, toggleCart] = useState(false);
  const [currency, setCurrency] = useState('NGN');
  const [cartItems, setCartItems] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { currency }
  });
  const [priceMap, setPriceMap] = useState({});

  useEffect(() => {
    const priceObj = {};
    data?.products.forEach(product => {
      priceObj[product.id] = product.price;
    });
    setPriceMap(priceObj);
  }, [data]);

  useEffect(() => {
    refetch()
  }, [currency, refetch]);

  const addToCart = (item) => {
    let product = cartItems.find((cartItem) => cartItem.id === item.id);
    if (product) {
      product.quantity += 1;
      const newProducts = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return product
        }
        return cartItem;
      })
      setCartItems([...newProducts]);
    } else {
      product = {...item};
      product.quantity = 1;
      setCartItems(prevState => ([
        ...prevState,
        product
      ]));
    }
    toggleCart(true);
  }

  const removeFromCart = (item) => {
    const newItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(newItems)
  };

  const increaseQty = (item) => {
    const newProducts = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        const newItem = {...cartItem}
        newItem.quantity += 1;
        return newItem;
      }
      return cartItem;
    });
    setCartItems([...newProducts]);
  }

  const decreaseQty = (item) => {
    const newItem = {...item};
    newItem.quantity -= 1;
    if (newItem.quantity === 0) {
      removeFromCart(item);
    } else {
      const newProducts = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return newItem;
        }
        return cartItem;
      });
      setCartItems([...newProducts]);
    }
  }

  return (
    <div className="App">
      <NavBar toggleCart={toggleCart} cartQty={cartItems.length} />
      <Banner />
      {
        loading ? <div className="loader">loading</div> :
          error ? 'Error Fetching Products' :
            (<ProductList currency={currency} products={data.products} addToCart={addToCart} />)
      }
      {
        isCartOpen && (
          <div>
            <div onClick={() => toggleCart(false)} className="underlay"></div>
            <Cart
              toggleCart={toggleCart}
              increaseQty={increaseQty}
              removeFromCart={removeFromCart}
              decreaseQty={decreaseQty}
              addToCart={addToCart}
              cartItems={cartItems}
              currencies={data?.currency}
              currency={currency}
              setCurrency={setCurrency}
              priceMap={priceMap}
            />
          </div>
        )
      }
    </div>
  );
}

export default App;
